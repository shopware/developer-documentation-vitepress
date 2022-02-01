const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/.vuepress/theme/*.vue",
    "./src/.vuepress/theme/global-components/*.vue",
    "./src/*.md"
  ],
  theme: {
    colors: {
      shopware: '#189eff',
      'shopware-gray-dark': '#181c1f',
      'shopware-gray-light': '#f5f7f9',
      slate: colors.slate,
      gray: colors.gray,
      white: colors.white,
      black: colors.black
    },
    extend: {},
  },
  plugins: [],
}
