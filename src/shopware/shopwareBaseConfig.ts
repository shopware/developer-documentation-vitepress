import { defineConfigWithTheme } from "vitepress";
import type { Config as ThemeConfig } from "../../src/vitepress/config";
import baseConfig from "../vitepress/config/baseConfig";

import navigation from "./navigation";

export default defineConfigWithTheme<ThemeConfig>({
    extends: baseConfig,

    themeConfig: {
        nav: navigation,
        appearance: true,
        socialLinks: [
          { icon: "github", link: "https://github.com/shopware/" },
          { icon: "twitter", link: "https://twitter.com/ShopwareDevs" },
          { icon: "slack", link: "https://slack.shopware.com" },
        ],
    }

});
