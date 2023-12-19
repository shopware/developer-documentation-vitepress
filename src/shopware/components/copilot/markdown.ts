import MarkdownIt from 'markdown-it';

import {
    componentPlugin,
} from '@mdit-vue/plugin-component'
import {
    frontmatterPlugin,
    type FrontmatterPluginOptions
} from '@mdit-vue/plugin-frontmatter'
import {
    headersPlugin,
    type HeadersPluginOptions
} from '@mdit-vue/plugin-headers'
import {slugify} from '@mdit-vue/shared'

import anchorPlugin from 'markdown-it-anchor'
import attrsPlugin from 'markdown-it-attrs'
import * as emojiPlugin from 'markdown-it-emoji'

import * as shiki from 'shiki';
//import {getHighlighter} from 'shiki-processor';
//import onigasm from 'shiki/dist/onig.wasm'

function extractLanguages(markdown) {
    const pattern = /```(\w+)/g;
    const matches = [];
    let match;

    while ((match = pattern.exec(markdown)) !== null) {
        matches.push(match[1].toLowerCase());
    }

    return matches;
}

const arrayIntersection = (arr1, arr2) => arr1.filter(value => arr2.includes(value));
const bundledLangs = Object.keys(shiki.BUNDLED_LANGUAGES.reduce((reduced, lang) => {
    reduced[lang.id] = lang.id;
    Object.values(lang.aliases || []).forEach(lang => reduced[lang] = lang);
    return reduced;
}, []));

export default async (markdown: string) => {
    if (markdown === '') {
        return '';
    }

    // we need to extract used languages to optimize performance and load only used languages
    const langs = arrayIntersection(bundledLangs, extractLanguages(markdown));

    // https://github.com/shikijs/shiki/blob/main/packages/shiki/src/__tests__/__fixtures__/index_browser_custom_wasm.html
    // https://vitejs.dev/guide/features.html#webassembly
    // https://www.npmjs.com/package/vite-plugin-wasm
    // shiki.setWasm(onigasm)
    shiki.setCDN('/shiki/');
    const highlighter = await shiki.getHighlighter({
        theme: 'github-dark',
        themes: ['github-dark', 'github-light'],
        langs,
    });

    const md = MarkdownIt({
        html: true,
        linkify: true,
        typographer: true,
        headers: true,
        highlight: (str: string, lang: string, attrs: string) => {
            const theme = document.querySelector('html').classList.contains('dark')
                ? 'github-dark'
                : 'github-light';
            return highlighter.codeToHtml(str, {lang, theme});
        },
    });
    md.linkify.set({fuzzyLink: false});
    md.use(componentPlugin);

    md.use(attrsPlugin, {})

    md.use(emojiPlugin)

    md.use(anchorPlugin, {
        slugify,
        permalink: anchorPlugin.permalink.linkInsideHeader({
            symbol: '&ZeroWidthSpace;',
            renderAttrs: (slug, state) => {
                // Find `heading_open` with the id identical to slug
                const idx = state.tokens.findIndex((token) => {
                    const attrs = token.attrs
                    const id = attrs?.find((attr) => attr[0] === 'id')
                    return id && slug === id[1]
                })
                // Get the actual heading content
                const title = state.tokens[idx + 1].content
                return {
                    'aria-label': `Permalink to "${title}"`
                }
            }
        }),
    } as anchorPlugin.AnchorOptions);

    //md.use(frontmatterPlugin, {} as FrontmatterPluginOptions)

    md.use(headersPlugin, {
        level: [2, 3, 4, 5, 6],
        slugify,
    } as HeadersPluginOptions)

    return md.render(markdown);
};