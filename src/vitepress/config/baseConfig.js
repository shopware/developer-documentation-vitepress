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

// for local-linked development
const deps = ["vitepress-shopware-docs", "@vueuse/core", "body-scroll-lock"];

/**
 * @type {() => Promise<import('vitepress').UserConfig>}
 */
module.exports = async () => ({
  vite: {
    ssr: {
      noExternal: deps
    },
    optimizeDeps: {
      exclude: deps
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
              warn: true
            }),
            presetTypography(),
            presetWebFonts({
              fonts: {
                sans: "DM Sans",
                serif: "DM Serif Display",
                mono: "DM Mono"
              }
            })
          ],
          transformers: [transformerDirectives(), transformerVariantGroup()]
        })
      )
    ]
  },

  head: [
    [
      'link',
      {
        rel: 'icon',
        href: "/img/logo.svg"
      }
    ],
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

  shouldPreload: (link) => {
    // make algolia chunk prefetch instead of preload
    return !link.includes('Algolia')
  }
})
