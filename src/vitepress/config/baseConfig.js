/**
 * This file is intended to be required from VitePress
 * consuming project's config file.
 *
 * It runs in Node.js.
 */
const Unocss = require("unocss/vite");
const {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} = require("unocss");

const navigation = require("./navigation")

// for local-linked development
const deps = ["vitepress-shopware-docs", "@vueuse/core", "body-scroll-lock"];

/**
 * @type {() => Promise<import('vitepress').UserConfig>}
 */
module.exports = async () => ({
  vite: {
    ssr: {
      noExternal: deps,
    },
    optimizeDeps: {
      exclude: deps,
    },
    plugins: [
      Unocss.default(
        defineConfig({
          shortcuts: [["text-shopware", "text-#0489EA"]],
          presets: [
            presetUno(),
            presetAttributify(),
            presetIcons({
              scale: 1.2,
              warn: true,
            }),
            presetTypography(),
            presetWebFonts({
              fonts: {
                sans: "DM Sans",
                serif: "DM Serif Display",
                mono: "DM Mono",
              },
            }),
          ],
          transformers: [transformerDirectives(), transformerVariantGroup()],
        })
      ),
    ],
  },

  head: [
    ...(process.env.NODE_ENV === "production"
      ? [
          [
            "link",
            {
              rel: "preload",
              href: "/assets/inter-latin.7b37fe23.woff2",
              as: "font",
              type: "font/woff2",
              crossorigin: "anonymous",
            },
          ],
        ]
      : []),
    [
      "script",
      {},
      require("fs").readFileSync(
        require("path").resolve(
          __dirname,
          "./inlined-scripts/applyDarkMode.js"
        ),
        "utf-8"
      ),
    ],
  ],

  markdown: {
    highlight: await require("./highlight")(),
  },

  vue: {
    reactivityTransform: true,
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith("elements-"),
      },
    },
  },

  shouldPreload: (link) => {
    // make algolia chunk prefetch instead of preload
    return !link.includes("Algolia");
  },
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
