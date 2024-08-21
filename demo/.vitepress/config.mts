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
import {resolve} from "path"

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig.default,

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
    },

    resolve: {
      alias: {
        '../composables/edit-link': resolve(__dirname, '../../src/shopware/composables/edit-link.ts'),
        './VPNavBarTitle.vue': resolve(__dirname, '../../src/shopware/components/override/VPNavBarTitle.vue'),
        './VPAlgoliaSearchBox.vue': resolve(__dirname, '../../src/shopware/components/override/VPAlgoliaSearchBox.vue'),
        '../NotFound.vue': resolve(__dirname, '../../src/shopware/components/override/NotFound.vue'),
        '../SwagRelatedArticles.vue': resolve(__dirname, '../../src/shopware/components/SwagRelatedArticles.vue'),
      }
    }
  }
});
