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
    }
  },
});
