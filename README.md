Welcome in Shopware documentation theme!

## Quickstart

Add `vitepress-shopware-docs` to your vitepress dependencies:

```
pnpm add vitepress-shopware-docs
```

## Project setup dependencies

Your `package.json` should look similar to this

```
{
  "engines": {
    "node": ">=14.0.0"
  },
  "scripts": {
    "dev": "vitepress",
    "build": "vitepress build",
    "serve": "vitepress serve"
  },
  "dependencies": {
    "vitepress-shopware-docs": "^0.0.1",
    "vitepress": "^0.22.2",
    "vue": "^3.2.31"
  },
  "devDependencies": {
    "@types/markdown-it": "^12.2.3",
    "@types/node": "^16.9.1"
  },
  "pnpm": {
    "peerDependencyRules": {
      "ignoreMissing": [
        "@algolia/client-search",
        "react",
        "react-dom",
        "@types/react"
      ]
    }
  }
}
```

## Vitepress config

Create `.vitepress/config.ts` file, example to edit for your needs:

```
import { defineConfigWithTheme } from "vitepress";
import type { Config as ThemeConfig } from "vitepress-shopware-docs";
import baseConfig from "vitepress-shopware-docs/config";

const nav = [
  {
    text: "Guide",
    activeMatch: `^/(guide|cookbook|examples)/`,
    items: [
      { text: "Guide", link: "/guide/introduction" },
      { text: "Examples", link: "/examples/" },
    ],
  },
  {
    text: "API",
    activeMatch: `^/api/`,
    link: "/api/",
  },
];

export const sidebar = {
  "/guide/": [
    {
      text: "Getting Started",
      items: [
        { text: "Introduction", link: "/guide/introduction" },
        {
          text: "Quick Start",
          link: "/guide/quick-start",
        },
      ],
    },
  ],
  "/api/": [
    {
      text: "Global API",
      items: [
        { text: "Application", link: "/api/application" },
        {
          text: "General",
          link: "/api/general",
        },
      ],
    },
  ],
};

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,

  lang: "en-US",
  title: "Shopware",
  description: "Documentation for Shopware developers",
  srcDir: "docs",
  // srcExclude: ["tutorial/**/description.md"], In case we need something to be excluded
  scrollOffset: "header",

  head: [],

  themeConfig: {
    nav,
    sidebar,

    algolia: {
      indexName: "",
      appId: "",
      apiKey: "",
      // searchParameters: {
      //   facetFilters: ["version:v1"],
      // },
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/shopware/" },
      { icon: "twitter", link: "https://twitter.com/ShopwareDevs" },
      { icon: "slack", link: "https://slack.shopware.com" },
    ],

    // remove if edit not needed
    editLink: {
      repo: "shopware/developer-documentation-vuepress",
      text: "Edit this page on GitHub",
    },
  },

  vite: {
    define: {
      __VUE_OPTIONS_API__: false,
    },
    server: {
      host: true,
      fs: {
        // for when developing with locally linked theme
        allow: ["../.."],
      },
    },
    build: {
      minify: "terser",
      chunkSizeWarningLimit: Infinity,
    },
    json: {
      stringify: true,
    },
  },

  vue: {
    reactivityTransform: true,
  },
});
```

## Theme setup

Create new file `.vitepress/theme/index.ts`:

```
// import './styles/index.css'
import { h, App } from "vue";
import { VPTheme } from "vitepress-shopware-docs";

export default Object.assign({}, VPTheme, {
  Layout: () => {
    // @ts-ignore
    return h(VPTheme.Layout, null, {
      // banner: () => h(Banner),
      // "content-top": () => h("h1", "We have important Announcement!"),
      // 'sidebar-top': () => h(PreferenceSwitch),
      // 'aside-mid': () => h(SponsorsAside),
      // 'aside-bottom': () => h(VueJobs)
    });
  },
  enhanceApp({ app }: { app: App }) {
    // app.provide('some-injection-key-if-needed', VALUE)
  },
});
```
