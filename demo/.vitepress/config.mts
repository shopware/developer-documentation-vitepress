import { defineConfigWithTheme } from "vitepress";
import type {
  Config as ThemeConfig,
  SwagColorCodingConfig,
  SwagEmbedsConfig,
  SwagSimilarArticlesConfig,
  SwagVersionSwitcherConfig
} from "../../src/shopware/config";
import { baseConfig } from "@shopware-docs/vitepress";

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
      embeds: [] as SwagEmbedsConfig[],
      similarArticles: {
        host: 'https://ai-ml.fly.dev',
        filter: {},
      } as SwagSimilarArticlesConfig,
      versionSwitcher: {
        paths: []
      } as SwagVersionSwitcherConfig,
      colorCoding: [] as SwagColorCodingConfig[]
    }
  },

  vite: {
    build: {
      rollupOptions: {
        external: [
          'fsevents',
          'vue-instantsearch/vue3/es',
          'instantsearch.css/themes/algolia-min.css',
        ]
      }
    }
  }
});
