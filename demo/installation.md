<h1 class="text-6xl mb-16 font-semibold accent">Shopware Documentation Theme</h1>

<PageRef title="Shopware Documentation Theme Components" sub="All components available for usage in the documentation theme" page="/components"/>

## Installation

Add `vitepress-shopware-docs` to your package dependencies

```bash
pnpm add vitepress-shopware-docs
```

## Project setup dependencies

Your `package.json` should look similar to this

```json
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

Create a `.vitepress/config.ts` that contains your theme configuration.

Please do not edit `themeConfig.nav`, as it is provided by the global theme to ensure a consistent overall navigation.

Also see the official Vitepress default theme [configuration reference](https://vitepress.vuejs.org/config/theme-configs).

### Theme Config Setup

Options you probably want to change are

| Option                 | Description                                                                                        |
| ---------------------- | -------------------------------------------------------------------------------------------------- |
| `title`                | Title of the website                                                                               |
| `description`          | Description of the website                                                                         |
| `srcDir`               | Directory of the documentation source files                                                        |
| `themeConfig.sidebar`  | Sidebar navigation setup ([more information](https://vitepress.vuejs.org/guide/theme-sidebar))     |
| `themeConfig.editLink` | "Edit on Github" link at page bottom ([more information](https://vitepress.vuejs.org/guide/theme-edit-link#edit-link)) |

```ts
import { defineConfigWithTheme } from "vitepress";
import type { Config as ThemeConfig } from "vitepress-shopware-docs";
import baseConfig from "vitepress-shopware-docs/config";

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,

  lang: "en-US",
  title: "Shopware",
  description: "Name of the documentation",
  srcDir: "docs",
  // srcExclude: ["tutorial/**/description.md"], In case we need something to be excluded
  scrollOffset: "header",

  head: [],

  themeConfig: {
    sidebar,

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

Tell Vitepress to use a custom theme by creating a `.vitepress/theme/index.ts` file.

You can register and use custom components just in any other Vue application using the `enhanceApp` hook.

For more information, see the official Vitepress documentation on [custom components](https://vitepress.vuejs.org/guide/using-vue#registering-global-components-in-the-theme).

```ts{7-16}
import { App } from "vue";
import { VPTheme } from "vitepress-shopware-docs";

import CustomComponent from "./components/CustomComponent.vue";

export default Object.assign({}, VPTheme, {
  enhanceApp(ctx: { app: App }) {
    // Call parent enhanceApp, so custom Shopware components are available
    VPTheme.enhanceApp(ctx);

    // Register custom components
    app.component('PageRef', PageRef),

    // Provide additional credentials if required
    ctx.app.provide('some-injection-key-if-needed', VALUE);
  },
});
```
