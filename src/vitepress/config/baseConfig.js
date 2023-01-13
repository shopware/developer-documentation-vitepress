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

// remove navigation from the library
// const navigation = require("./navigation");
const navigation = [];
const { withMermaid } = require("vitepress-plugin-mermaid");

// for local-linked development
const deps = ['@vue/theme', '@vueuse/core', 'body-scroll-lock']

/**
 * @type {() => Promise<import('vitepress').UserConfig>}
 */
module.exports = async () => withMermaid({
  vite: {
    ssr: {
      noExternal: deps
    },
    optimizeDeps: {
      exclude: deps
    }
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

  resolve: {
    // for mounting static sub-repos
    preserveSymlinks: true
  },

  head: [
    ...(process.env.NODE_ENV === 'production'
      ? [
          [
            'link',
            {
              rel: 'preload',
              // comes from vite, update this if the font file is changed
              href: '/assets/inter-latin.4fe6132f.woff2',
              as: 'font',
              type: 'font/woff2',
              crossorigin: 'anonymous'
            }
          ]
        ]
      : [])
  ],

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
    return !link.includes('Algolia')
  },

  themeConfig: {
    nav: navigation,
    appearance: true,
    socialLinks: [
      {icon: "github", link: "https://github.com/shopware/"},
      {icon: "twitter", link: "https://twitter.com/ShopwareDevs"},
      {icon: "slack", link: "https://slack.shopware.com"},
      {icon: "stackoverflow", link: "https://stackoverflow.com/questions/tagged/shopware"},
    ],
  }
})
