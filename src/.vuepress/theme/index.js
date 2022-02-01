module.exports = {
  plugins: [
    ['@vuepress/search', {
      searchMaxSuggestions: 10
    }],
    ['@vuepress/prismjs', {
      languages: ['javascript', 'css', 'html', 'typescript', 'vue', 'bash', 'json', 'yaml'],
    }],
  ]
}