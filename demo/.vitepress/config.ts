import { defineConfigWithTheme } from "vitepress";
import type { Config as ThemeConfig, SidebarConfig } from "../../src/vitepress/config";
import shopwareBaseConfig from "../../src/shopware/shopwareBaseConfig";

import apps from "./sidebar/apps";
import themes from "./sidebar/themes";
import frontends from "./sidebar/frontends";
import integrations from "./sidebar/integrations";
import paas from "./sidebar/docs/products/paas";

const sidebar: SidebarConfig = {
  "/apps/": apps,
  "/themes/": themes,
  "/frontends/": frontends,
  "/integrations/": integrations,
  "/docs/products/paas/": paas,
};

export default defineConfigWithTheme<ThemeConfig>({
  extends: shopwareBaseConfig,

  lang: "en-US",
  title: "Shopware",
  description: "Documentation for Shopware developers",
  srcDir: ".",
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
