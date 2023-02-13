/**
 * This file is intended to be required from VitePress
 * consuming project's config file.
 *
 * It runs in Node.js.
 */
const Unocss = require("unocss/vite");
const {
  defineConfig,
  presetIcons,
  presetUno,
} = require("unocss");

// remove navigation from the library
// const navigation = require("./navigation");
const navigation = [];

const { withMermaid } = require("vitepress-plugin-mermaid");

// for local-linked development
const deps = ["vitepress-shopware-docs", "@vueuse/core", "body-scroll-lock"];

/**
 * @type {() => Promise<import('vitepress').UserConfig>}
 */
module.exports = async () => withMermaid({
  lang: "en-US",
  srcDir: ".",
  scrollOffset: "header",

  vite: {
    ssr: {
      noExternal: deps,
    },
    optimizeDeps: {
      exclude: deps,
    },
    resolve: {
      // for mounting static sub-repos
      preserveSymlinks: true
    },
    // https://www.npmjs.com/package/@rollup/plugin-node-resolve ?
    // https://github.com/vuejs/vitepress/blob/main/rollup.config.ts ?
    build: {
      minify: "terser",
      chunkSizeWarningLimit: Infinity,
      rollupOptions: {
        preserveSymlinks: true,
        shimMissingExports: true
      }
    },
    plugins: [
      Unocss.default(
        defineConfig({
          shortcuts: [["text-shopware", "text-#0489EA"]],
          presets: [
            presetUno(),
            presetIcons({
              scale: 1.2,
              warn: true,
            }),
          ],
        })
      ),
    ],
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
    json: {
      stringify: true,
    },
  },

  head: [
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
      {icon: "github", link: "https://github.com/shopware/"},
      {icon: "twitter", link: "https://twitter.com/ShopwareDevs"},
      {icon: "slack", link: "https://slack.shopware.com"},
      {icon: "stackoverflow", link: "https://stackoverflow.com/questions/tagged/shopware"},
    ],
    editLink: {
      repo: "shopware/developer-documentation-template",
      text: "Edit this page on GitHub",
    },
  }
});
