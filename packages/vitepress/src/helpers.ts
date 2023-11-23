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

export const createSitemap = async (urls: string[] = []) => {
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
        hostname: 'https://developer.shopware.com',
        destinationDir,
        sourceData,
        limit,
        gzip: false
    })

    // create robots.txt
    const robots = [
        'User-agent: *',
        'Allow: /',
        'Sitemap: https://developer.shopware.com/sitemap.xml'
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
