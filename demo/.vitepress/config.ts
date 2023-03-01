import { defineConfigWithTheme } from "vitepress";
import type { Config as ThemeConfig } from "../../src/vitepress/config";
import baseConfig from "../../src/vitepress/config/baseConfig";

import sidebar from "./sidebar";

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,

  title: "Shopware",
  description: "Documentation for Shopware developers",

  themeConfig: {
    sidebar,
    // @ts-ignore
    swag: {
      // "http://172.18.0.1:10002"
      similarArticlesHost: 'https://ai-ml.fly.dev',
    }
  },
});
