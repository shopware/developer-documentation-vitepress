const path = require("path");

module.exports = (options, ctx) => {
  const enableSmoothScroll = true; // themeConfig.smoothScroll === true;

  return {
    themeConfig: {
      searchPlaceholder: 'Search... ("/" or "s")',
    },

    plugins: [
      ["@vuepress/active-header-links", options.activeHeaderLinks],
      "@vuepress/search",
      "@vuepress/plugin-nprogress",
      [
        "container",
        {
          type: "tip",
          defaultTitle: {
            "/": "TIP",
          },
        },
      ],
      [
        "container",
        {
          type: "warning",
          defaultTitle: {
            "/": "WARNING",
          },
        },
      ],
      [
        "container",
        {
          type: "danger",
          defaultTitle: {
            "/": "DANGER",
          },
        },
      ],
      [
        "container",
        {
          type: "details",
          before: (info) =>
            `<details class="custom-block details">${
              info ? `<summary>${info}</summary>` : ""
            }\n`,
          after: () => "</details>\n",
        },
      ],
      ["smooth-scroll", enableSmoothScroll],
      [require("./plugin.js")],
    ],
  };
};

module.exports.meta = require("./package.json");
