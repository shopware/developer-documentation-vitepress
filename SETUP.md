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
    "node": ">=20.0.0"
  },
  "scripts": {
    "dev": "vitepress",
    "build": "vitepress build",
    "serve": "vitepress serve"
  },
  "dependencies": {
    "vitepress-shopware-docs": "^1.0.0",
    "vitepress": "^1.0.0-beta.1",
    "vue": "^3.3.0"
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

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,

  lang: "en-US",
  title: "Shopware",
  description: "Name of the documentation",
  srcDir: "docs",
  scrollOffset: "header",
  themeConfig: {
    swag: {} // see SwagConfig
  },
});
```

## Theme setup

Create new file `.vitepress/theme/index.ts`:

```
import {SWAGTheme} from "vitepress-shopware-docs";

export default {
    ...SWAGTheme(),
}

```
