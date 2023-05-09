# Quick Setup

Add `vitepress-shopware-docs` to your vitepress dependencies:

```
pnpm add vitepress-shopware-docs
```

## Project setup dependencies

Your `package.json` should look similar to this

```
{
  "engines": {
    "node": ">=18.0.0"
  },
  "scripts": {
    "dev": "vitepress",
    "build": "vitepress build",
    "serve": "vitepress serve"
  },
  "dependencies": {
    "vitepress-shopware-docs": "^1.0.0",
    "vitepress": "^1.0.0-alpha.75",
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
import shopwareBaseConfig from "vitepress-shopware-docs";

export default defineConfigWithTheme<ThemeConfig>({
  extends: shopwareBaseConfig,

  lang: "en-US",
  title: "Shopware",
  description: "Name of the documentation",
  srcDir: "docs",
  // srcExclude: ["tutorial/**/description.md"], In case we need something to be excluded
  scrollOffset: "header",

  head: [],

  themeConfig: {
    sidebar,

    algolia: {
      indexName: "",
      appId: "",
      apiKey: "",
      // searchParameters: {
      //   facetFilters: ["version:v1"],
      // },
    },

    // remove if edit not needed
    editLink: {
      repo: "shopware/developer-documentation-vuepress",
      text: "Edit this page on GitHub",
    },
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
