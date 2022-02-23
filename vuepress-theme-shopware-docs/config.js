const tailwindConfig = require("./tailwind.config");

function extendThemeConfig(config) {
  return {
    ...config,
    theme: "vuepress-theme-shopware-docs",
    head: [
      ...config.head,
      [
        "script",
        {
          src: "https://unpkg.com/tailwindcss-jit-cdn@1.3.0/dist/tailwindcss-jit-cdn.umd.min.js",
        },
      ],
      ["script", { type: "tailwind-config" }, JSON.stringify(tailwindConfig)],
      ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
      ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com' }],
      ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;800&display=swap' }],
    ],
  };
}

module.exports = extendThemeConfig;