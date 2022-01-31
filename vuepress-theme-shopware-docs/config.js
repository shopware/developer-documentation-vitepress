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
    ],
  };
}

module.exports = extendThemeConfig;
