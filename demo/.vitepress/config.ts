import { defineConfigWithTheme } from "vitepress";
import type { Config as ThemeConfig } from "../../src/vitepress/config";
import baseConfig from "../../src/vitepress/config/baseConfig";

import sidebar from "./sidebar";

interface SidebarItem {
  text: string,
  description: string,
  link: string,
  items: SidebarItem[]
}

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,

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
      pattern: "shopware/developer-documentation-vuepress",
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

  async buildEnd(){
    // @ts-ignore
    const reduced = [];
    const reduce = (tree: SidebarItem[]) => {
      tree.forEach(item => {
        const {text, description, link, items} = item;
        reduced.push({text, description, link});
        items && reduce(items)
      })
    }

    Object.keys(sidebar)
      // @ts-ignore
      .forEach(key => reduce(sidebar[key]));

    console.log(JSON.stringify(reduced).length);

    //await console.log('BUILD END2', sidebar);
    //throw "test"
  }
});
