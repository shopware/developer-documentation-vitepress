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
const path = require("path");

const iconStackoverflow = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">\n' +
    '    <path d="M28.16 32H2.475V20.58H5.32v8.575h19.956V20.58h2.884z" />\n' +
    '    <path d="M8.477 19.8l13.993 2.923.585-2.806-13.993-2.923zm1.832-6.704l12.94 6.04 1.208-2.572-12.94-6.08zm3.586-6.353l10.99 9.12 1.832-2.183-10.99-9.12zM20.99 0l-2.3 1.715 8.536 11.46 2.3-1.715zM8.166 26.27H22.43v-2.845H8.166v2.845z" />\n' +
    '</svg>';

// remove navigation from the library
// const navigation = require("./navigation");
const navigation = [];

// for local-linked development
const deps = ["vitepress-shopware-docs", "@vueuse/core", "body-scroll-lock", "fsevents"];

/**
 * @type {() => Promise<import('vitepress').UserConfig>}
 */
module.exports = async () => ({
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
      preserveSymlinks: true,

      alias: {
        '../composables/edit-link': path.resolve(__dirname, '../composables/edit-link.ts'),
        './VPNavBarTitle.vue': path.resolve(__dirname, '../components/VPNavBarTitle.vue'),
      }
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
    headers: true,
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
      {icon: {svg: iconStackoverflow}, link: "https://stackoverflow.com/questions/tagged/shopware"}
    ],
    editLink: {
      pattern: 'https://github.com/shopware/developer-portal',
      text: "Edit this page on GitHub",
    },
  }
});
