const { path } = require("@vuepress/shared-utils");

module.exports = (options = {}, context) => ({
  name: "tailwind-postcss-plugin",
  enhanceAppFiles: path.resolve(__dirname, "tailwindPostcssScript.js"),
});
