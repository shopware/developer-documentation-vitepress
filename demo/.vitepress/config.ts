import { defineConfigWithTheme } from "vitepress";
import type { Config as ThemeConfig } from "../../src/vitepress/config";
import baseConfig from "../../src/vitepress/config/baseConfig";

import navigation from "./navigation";

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,

  title: "Shopware",
  description: "Documentation for Shopware developers",

  themeConfig: {
    // sidebar and nav
    ...navigation,
    // @ts-ignore
    swag: {
      similarArticlesHost: 'https://ai-ml.fly.dev',
      similarArticlesFilter: {},
      versionSwitcher: {
        paths: [
          {
            'docs': 'Latest (v6.5)',
            'docs/v6.4': 'v6.4',
            'docs/v6.3': 'v6.3',
          }
        ]
      }
    }
  },

  build: {
    rollupOptions: {
      external: [
          'fsevents'
      ]
    }
  }
});
