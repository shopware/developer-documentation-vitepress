import fs from "fs-extra";
import glob from "glob";
import yaml from "js-yaml";
import path from "path";
import {simpleSitemapAndIndex, SitemapItemLoose, EnumChangefreq} from "sitemap";
import {HeadConfig, TransformContext} from "vitepress";

const sourceRoot = 'src/';

interface AssetDir {
    src: string;
    dst: string;
    ext?: string[];
}

export const copyAdditionalAssets = async (customDirs: (string | AssetDir)[] = []) => {
    const publicDirs: (string | AssetDir)[] = await new Promise((resolve, reject) => {
        console.log('Discovering docs.yml');
        glob("**/docs.yml", {}, (er, files) => {
            const directories: (string | AssetDir)[] = files.reduce((reduced, file) => {
                const content = yaml.load(fs.readFileSync(file))
                const filesToCopy = content?.['build-end']?.['copy-additional-assets'] ?? [];
                const dirName = path.dirname(file);

                return [
                    ...reduced,
                    ...filesToCopy.map((fileToCopy: string) => `${dirName.substring(sourceRoot.length)}/${fileToCopy}`)
                ];
            }, customDirs);
            resolve(directories)
        });
    });

    console.log(`Copying non-standard static assets from ${process.cwd()}/${sourceRoot} to ${process.cwd()}/.vitepress/dist/`);
    publicDirs.forEach(dir => {
        const src = typeof dir === 'string' ? dir : dir.src;
        const dst = typeof dir === 'string' ? dir : dir.dst;
        const extensions = typeof dir === 'string' ? undefined : dir.ext;
        const dirToCopy = `${process.cwd()}/${sourceRoot}${src}`;
        const distDir = `${process.cwd()}/.vitepress/dist/${dst}`;

        // make sure dir exists
        try {
            fs.statSync(distDir).isDirectory();
            console.log(`dir exists ${distDir}`)
        } catch (e) {
            console.log(`creating dir ${distDir}`)
            fs.mkdirSync(distDir, {recursive: true});
        }

        // copy files
        fs.readdirSync(dirToCopy).forEach((file: string) => {
            if (extensions) {
                let skip = true;
                for (const extension of extensions) {
                    if (file.endsWith(extension)) {
                        skip = false;
                        continue;
                    }
                }
                if (skip) {
                    return;
                }
            }

            console.log(`Copying ${dirToCopy}/${file} to ${distDir}/${file}`);
            fs.writeFileSync(`${distDir}/${file}`, fs.readFileSync(`${dirToCopy}/${file}`));
        });
    })

}

export const createSitemap = async (urls: string[] = [], domain: string) => {
    console.log('Discovering *.html');
    const files: string[] = await new Promise((resolve) => {
        glob("./.vitepress/dist/**/*.html", {}, (er, files) => {
            const urls = files.map(file => file.substring('./.vitepress/dist'.length))
                .map(file => file.endsWith('/index.html')
                    ? file.substring(0, file.length - 'index.html'.length)
                    : file)
                .filter(file => file !== '/404.html');
            resolve(urls);
        });
    });

    const priorities = {
        2: 1.0,
        3: 0.8,
        4: 0.6,
        5: 0.4,
        6: 0.2,
    };
    const sourceData: SitemapItemLoose[] = [...files, ...urls]
        .map((url: string): SitemapItemLoose => ({
            url,
            changefreq: EnumChangefreq.MONTHLY,
            priority: priorities[url.split('/').length] || 0.1
        }));

    console.log('Writing sitemap.xml');
    const destinationDir = './.vitepress/dist/';
    const limit = 50_000;
    await simpleSitemapAndIndex({
        hostname: `https://${domain}`,
        destinationDir,
        sourceData,
        limit,
        gzip: false
    })

    // create robots.txt
    const robots = [
        'User-agent: *',
        'Allow: /',
        `Sitemap: https://${domain}/sitemap.xml`
    ].join("\n");
    fs.writeFileSync(`${destinationDir}robots.txt`, robots);

    if (limit >= sourceData.length) {
        // transform to single no-indexed sitemap
        fs.rmSync(`${destinationDir}sitemap-index.xml`);
        fs.rename(`${destinationDir}sitemap-0.xml`, `${destinationDir}sitemap.xml`);
    } else {
        // rename index
        fs.rename(`${destinationDir}sitemap-index.xml`, `${destinationDir}sitemap.xml`);
    }

}

export interface Redirect {
    src: string
    dst: string
}

// discover docs.yml, .gitbook.yaml and docusaurus.config.js
// write new redirects to vercel.json
export const storeRedirects = async () => {
    const makeDestination = (url: string, prefix: string): string => {
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }

        return `/${prefix}${url}`
            .replace('*', ':url*')
            .replace('/README.md', '/')
            .replace('.md', '.html');
    }

    const makeSource = (url: string, prefix: string): string => {
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }

        return `/${prefix}${url}`
            .replace('*', ':url')
            .replace('.md', '.html');
    }

    // transform from key-value to {src: string, dst: string}
    const transformRedirects = (redirects: { [key: string]: string }, prefix: string) => Object
        .keys(redirects ?? {})
        .map(src => ({
            src: makeSource(src, prefix),
            dst: makeDestination(redirects[src], prefix)
        }));

    // collect all redirects
    const redirects: Redirect[] = await new Promise(async (resolve, reject) => {
        const cwd = process.cwd();
        console.log('cwd', cwd);

        const docsYmlRedirects: Redirect[] = await new Promise((resolve, reject) => {
            console.log('Discovering docs.yml for redirects');
            glob("**/docs.yml", {}, (er, files) => {
                const directories = files.reduce((reduced: Redirect[], file: string) => {
                    console.log(`Collecting ${file}`);
                    const content = yaml.load(fs.readFileSync(file))
                    const prefix = file.substring(sourceRoot.length, file.length - '.docs.yml'.length);

                    return [
                        ...reduced,
                        ...transformRedirects(content?.redirects ?? {}, prefix)
                    ];
                }, []);
                resolve(directories)
            });
        });

        const gitbookRedirects: Redirect[] = await new Promise((resolve, reject) => {
            console.log('Discovering gitbook.yaml for redirects');
            glob("**/.gitbook.yaml", {}, (er, files) => {
                const redirects = files.reduce((redirects: Redirect[], file: string) => {
                    console.log(`Collecting ${file}`);
                    const content = yaml.load(fs.readFileSync(file))
                    const prefix = file.substring(sourceRoot.length, file.length - '.gitbook.yaml'.length);

                    return [
                        ...redirects,
                        ...transformRedirects(content?.redirects ?? {}, prefix),
                    ];
                }, []);
                resolve(redirects)
            });
        });

        resolve([
            ...docsYmlRedirects,
            ...gitbookRedirects,
        ]);
    });

    // early return
    if (!redirects.length) {
        return;
    }

    // read current vercel.json
    const data = JSON.parse(`${fs.readFileSync('./vercel.json')}`);

    // prepare redirects
    if (!data.redirects) {
        data.redirects = [];
    }

    // push redirects
    redirects.forEach(redirect => data.redirects.push({
        source: redirect.src,
        destination: redirect.dst,
        statusCode: 301
    }))

    // make unique
    data.redirects = [...(new Set(data.redirects.map(value => JSON.stringify(value))))]
        .map(value => JSON.parse(value as string));

    // store new vercel.json
    fs.writeFileSync('./vercel.json', JSON.stringify(data, null, 2));
}

export const addOGImage = (head: HeadConfig[], context: TransformContext) => {
    let title = context.pageData.frontmatter?.title || context.pageData.frontmatter?.nav?.title || context.pageData.title;

    // fallback to the file name
    if (!title) {
        let filename = context.pageData.filePath
            .replace('/index.md', '')
            .replace('.md', '')
            .split('/')
            .reverse()[0]
            .replace('-', ' ');
        title = `${filename[0].toUpperCase()}${filename.substring(1)}`
    }

    head.push([
        'meta',
        {
            property: 'og:image',
            content: `https://shopware-docs-og.vercel.app/api/og?title=${encodeURIComponent(title)}`,
        }
    ]);
}

export const userCentricsHead = (options: { usercentrics: string, hotjar?: string, gtm?: string, rollbar?: string } = {}) => {
    const head = [];
    const transformToEventListener = (consent: string, data: ['script' | 'link', object, string | undefined]) => {
        // no cookie-wall, return original script or link
        if (!options.usercentrics) {
            return data;
        }

        const [type, props, body] = data;
        let content = "window.addEventListener(\"ucEvent\", function (e) {    \n" +
            `    if( e.detail && e.detail.event == \"consent_status\" && e.detail[${JSON.stringify(consent)}]) {\n` +
            `        const element = document.createElement(${JSON.stringify(type)});\n` +
            "        " + Object.keys(props).map((key) => `element[${JSON.stringify(key)}] = ${JSON.stringify(props[key])};`).join('') + "\n" +
            (body ? `        element.innerHTML = ${JSON.stringify(body)};\n` : '') +
            "        document.head.appendChild(element);" +
            "    }\n" +
            "});";

        // return script reacting on ucEvent window event triggered by usercentrics
        return [
            'script',
            {},
            content
        ];
    }

    if (options.gtm) {
        head.push(...[
            [
                'script',
                {
                    async: true,
                    src: `https://www.googletagmanager.com/gtag/js?id=${options.gtm}`,
                }
            ],

            [
                'script',
                {},
                `window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', '${options.gtm}');`
            ],
        ].map(data => transformToEventListener('Google Tag Manager', data)))
    }

    if (options.hotjar) {
        head.push(transformToEventListener('Google Tag Manager', [
            'script',
            {},
            `(function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:${options.hotjar},hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`
        ]));
    }

    if (options.rollbar) {
        head.push(transformToEventListener('Rollbar', [
            'script',
            {},
            "var _rollbarConfig = {\n" +
            "    accessToken: '" + options.rollbar + "',\n" +
            "    captureUncaught: true,\n" +
            "    captureUnhandledRejections: true,\n" +
            "    payload: {\n" +
            "        environment: 'testenv',\n" +
            "        // context: 'rollbar/test'\n" +
            "        client: {\n" +
            "          javascript: {\n" +
            "            code_version: '1.0',\n" +
            "            // source_map_enabled: true,\n" +
            "            // guess_uncaught_frames: true\n" +
            "          }\n" +
            "        }\n" +
            "    }\n" +
            "};\n" +
            "// Rollbar Snippet\n" +
            "!function(r){var e={};function o(n){if(e[n])return e[n].exports;var t=e[n]={i:n,l:!1,exports:{}};return r[n].call(t.exports,t,t.exports,o),t.l=!0,t.exports}o.m=r,o.c=e,o.d=function(r,e,n){o.o(r,e)||Object.defineProperty(r,e,{enumerable:!0,get:n})},o.r=function(r){\"undefined\"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(r,Symbol.toStringTag,{value:\"Module\"}),Object.defineProperty(r,\"__esModule\",{value:!0})},o.t=function(r,e){if(1&e&&(r=o(r)),8&e)return r;if(4&e&&\"object\"==typeof r&&r&&r.__esModule)return r;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,\"default\",{enumerable:!0,value:r}),2&e&&\"string\"!=typeof r)for(var t in r)o.d(n,t,function(e){return r[e]}.bind(null,t));return n},o.n=function(r){var e=r&&r.__esModule?function(){return r.default}:function(){return r};return o.d(e,\"a\",e),e},o.o=function(r,e){return Object.prototype.hasOwnProperty.call(r,e)},o.p=\"\",o(o.s=0)}([function(r,e,o){\"use strict\";var n=o(1),t=o(5);_rollbarConfig=_rollbarConfig||{},_rollbarConfig.rollbarJsUrl=_rollbarConfig.rollbarJsUrl||\"https://cdn.rollbar.com/rollbarjs/refs/tags/v2.26.0/rollbar.min.js\",_rollbarConfig.async=void 0===_rollbarConfig.async||_rollbarConfig.async;var a=n.setupShim(window,_rollbarConfig),l=t(_rollbarConfig);window.rollbar=n.Rollbar,a.loadFull(window,document,!_rollbarConfig.async,_rollbarConfig,l)},function(r,e,o){\"use strict\";var n=o(2),t=o(3);function a(r){return function(){try{return r.apply(this,arguments)}catch(r){try{console.error(\"[Rollbar]: Internal error\",r)}catch(r){}}}}var l=0;function i(r,e){this.options=r,this._rollbarOldOnError=null;var o=l++;this.shimId=function(){return o},\"undefined\"!=typeof window&&window._rollbarShims&&(window._rollbarShims[o]={handler:e,messages:[]})}var s=o(4),d=function(r,e){return new i(r,e)},c=function(r){return new s(d,r)};function u(r){return a((function(){var e=this,o=Array.prototype.slice.call(arguments,0),n={shim:e,method:r,args:o,ts:new Date};window._rollbarShims[this.shimId()].messages.push(n)}))}i.prototype.loadFull=function(r,e,o,n,t){var l=!1,i=e.createElement(\"script\"),s=e.getElementsByTagName(\"script\")[0],d=s.parentNode;i.crossOrigin=\"\",i.src=n.rollbarJsUrl,o||(i.async=!0),i.onload=i.onreadystatechange=a((function(){if(!(l||this.readyState&&\"loaded\"!==this.readyState&&\"complete\"!==this.readyState)){i.onload=i.onreadystatechange=null;try{d.removeChild(i)}catch(r){}l=!0,function(){var e;if(void 0===r._rollbarDidLoad){e=new Error(\"rollbar.js did not load\");for(var o,n,a,l,i=0;o=r._rollbarShims[i++];)for(o=o.messages||[];n=o.shift();)for(a=n.args||[],i=0;i<a.length;++i)if(\"function\"==typeof(l=a[i])){l(e);break}}\"function\"==typeof t&&t(e)}()}})),d.insertBefore(i,s)},i.prototype.wrap=function(r,e,o){try{var n;if(n=\"function\"==typeof e?e:function(){return e||{}},\"function\"!=typeof r)return r;if(r._isWrap)return r;if(!r._rollbar_wrapped&&(r._rollbar_wrapped=function(){o&&\"function\"==typeof o&&o.apply(this,arguments);try{return r.apply(this,arguments)}catch(o){var e=o;throw e&&(\"string\"==typeof e&&(e=new String(e)),e._rollbarContext=n()||{},e._rollbarContext._wrappedSource=r.toString(),window._rollbarWrappedError=e),e}},r._rollbar_wrapped._isWrap=!0,r.hasOwnProperty))for(var t in r)r.hasOwnProperty(t)&&(r._rollbar_wrapped[t]=r[t]);return r._rollbar_wrapped}catch(e){return r}};for(var p=\"log,debug,info,warn,warning,error,critical,global,configure,handleUncaughtException,handleAnonymousErrors,handleUnhandledRejection,captureEvent,captureDomContentLoaded,captureLoad\".split(\",\"),f=0;f<p.length;++f)i.prototype[p[f]]=u(p[f]);r.exports={setupShim:function(r,e){if(r){var o=e.globalAlias||\"Rollbar\";if(\"object\"==typeof r[o])return r[o];r._rollbarShims={},r._rollbarWrappedError=null;var l=new c(e);return a((function(){e.captureUncaught&&(l._rollbarOldOnError=r.onerror,n.captureUncaughtExceptions(r,l,!0),e.wrapGlobalEventHandlers&&t(r,l,!0)),e.captureUnhandledRejections&&n.captureUnhandledRejections(r,l,!0);var a=e.autoInstrument;return!1!==e.enabled&&(void 0===a||!0===a||\"object\"==typeof a&&a.network)&&r.addEventListener&&(r.addEventListener(\"load\",l.captureLoad.bind(l)),r.addEventListener(\"DOMContentLoaded\",l.captureDomContentLoaded.bind(l))),r[o]=l,l}))()}},Rollbar:c}},function(r,e,o){\"use strict\";function n(r,e,o,n){r._rollbarWrappedError&&(n[4]||(n[4]=r._rollbarWrappedError),n[5]||(n[5]=r._rollbarWrappedError._rollbarContext),r._rollbarWrappedError=null);var t=e.handleUncaughtException.apply(e,n);o&&o.apply(r,n),\"anonymous\"===t&&(e.anonymousErrorsPending+=1)}r.exports={captureUncaughtExceptions:function(r,e,o){if(r){var t;if(\"function\"==typeof e._rollbarOldOnError)t=e._rollbarOldOnError;else if(r.onerror){for(t=r.onerror;t._rollbarOldOnError;)t=t._rollbarOldOnError;e._rollbarOldOnError=t}e.handleAnonymousErrors();var a=function(){var o=Array.prototype.slice.call(arguments,0);n(r,e,t,o)};o&&(a._rollbarOldOnError=t),r.onerror=a}},captureUnhandledRejections:function(r,e,o){if(r){\"function\"==typeof r._rollbarURH&&r._rollbarURH.belongsToShim&&r.removeEventListener(\"unhandledrejection\",r._rollbarURH);var n=function(r){var o,n,t;try{o=r.reason}catch(r){o=void 0}try{n=r.promise}catch(r){n=\"[unhandledrejection] error getting `promise` from event\"}try{t=r.detail,!o&&t&&(o=t.reason,n=t.promise)}catch(r){}o||(o=\"[unhandledrejection] error getting `reason` from event\"),e&&e.handleUnhandledRejection&&e.handleUnhandledRejection(o,n)};n.belongsToShim=o,r._rollbarURH=n,r.addEventListener(\"unhandledrejection\",n)}}}},function(r,e,o){\"use strict\";function n(r,e,o){if(e.hasOwnProperty&&e.hasOwnProperty(\"addEventListener\")){for(var n=e.addEventListener;n._rollbarOldAdd&&n.belongsToShim;)n=n._rollbarOldAdd;var t=function(e,o,t){n.call(this,e,r.wrap(o),t)};t._rollbarOldAdd=n,t.belongsToShim=o,e.addEventListener=t;for(var a=e.removeEventListener;a._rollbarOldRemove&&a.belongsToShim;)a=a._rollbarOldRemove;var l=function(r,e,o){a.call(this,r,e&&e._rollbar_wrapped||e,o)};l._rollbarOldRemove=a,l.belongsToShim=o,e.removeEventListener=l}}r.exports=function(r,e,o){if(r){var t,a,l=\"EventTarget,Window,Node,ApplicationCache,AudioTrackList,ChannelMergerNode,CryptoOperation,EventSource,FileReader,HTMLUnknownElement,IDBDatabase,IDBRequest,IDBTransaction,KeyOperation,MediaController,MessagePort,ModalWindow,Notification,SVGElementInstance,Screen,TextTrack,TextTrackCue,TextTrackList,WebSocket,WebSocketWorker,Worker,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload\".split(\",\");for(t=0;t<l.length;++t)r[a=l[t]]&&r[a].prototype&&n(e,r[a].prototype,o)}}},function(r,e,o){\"use strict\";function n(r,e){this.impl=r(e,this),this.options=e,function(r){for(var e=function(r){return function(){var e=Array.prototype.slice.call(arguments,0);if(this.impl[r])return this.impl[r].apply(this.impl,e)}},o=\"log,debug,info,warn,warning,error,critical,global,configure,handleUncaughtException,handleAnonymousErrors,handleUnhandledRejection,_createItem,wrap,loadFull,shimId,captureEvent,captureDomContentLoaded,captureLoad\".split(\",\"),n=0;n<o.length;n++)r[o[n]]=e(o[n])}(n.prototype)}n.prototype._swapAndProcessMessages=function(r,e){var o,n,t;for(this.impl=r(this.options);o=e.shift();)n=o.method,t=o.args,this[n]&&\"function\"==typeof this[n]&&(\"captureDomContentLoaded\"===n||\"captureLoad\"===n?this[n].apply(this,[t[0],o.ts]):this[n].apply(this,t));return this},r.exports=n},function(r,e,o){\"use strict\";r.exports=function(r){return function(e){if(!e&&!window._rollbarInitialized){for(var o,n,t=(r=r||{}).globalAlias||\"Rollbar\",a=window.rollbar,l=function(r){return new a(r)},i=0;o=window._rollbarShims[i++];)n||(n=o.handler),o.handler._swapAndProcessMessages(l,o.messages);window[t]=n,window._rollbarInitialized=!0}}}}]);\n" +
            "// End Rollbar Snippet"
        ]));
    }

    if (options.usercentrics) {
        head.push(...[
            [
                'link',
                {
                    rel: 'preconnect',
                    href: '//app.usercentrics.eu',
                }
            ],
            [
                'link',
                {
                    rel: 'preconnect',
                    href: '//api.usercentrics.eu',
                }
            ],
            [
                'link',
                {
                    rel: 'preload',
                    href: '//app.usercentrics.eu/browser-ui/latest/loader.js',
                    as: 'script',
                }
            ],
            [
                'script',
                {
                    async: true,
                    src: "https://app.usercentrics.eu/browser-ui/latest/loader.js",
                    'data-settings-id': options.usercentrics,
                    id: 'usercentrics-cmp'
                }
            ],
        ]);
    }

    return head;
}