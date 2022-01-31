module.exports = {
  searchPlaceholder: "Foobar",

  themeConfig: {
    searchPlaceholder: 'Search... ("/" or "s")',
  },

  plugins: [
    [
      "@vuepress/search",
      {
        searchMaxSuggestions: 10,
      },
    ],
    "@silvanite/tailwind",
    // [
    //   "@silvanite/tailwind",
    //   {
    //     config: require("../tailwind.config.js"),
    //   },
    // ],
  ],
};
