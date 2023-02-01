/**
 * This file is used for downloading and caching Google Fonts because vite-plugin-webfont-dl is broken.
 * nano node_modules/.pnpm/google-fonts-helper@3.2.2/node_modules/google-fonts-helper/dist/index.cjs
 * remove 'del' import.
 * $ node ./.github/scripts/fonts.js
 */
const { download } = require('google-fonts-helper');

(async () => {
    const downloader = download('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Poppins:wght@800&display=swap', {
        base64: false,
        overwriting: false,
        outputDir: './src/',
        stylePath: 'vitepress/styles/fonts.css',
        fontsDir: 'vitepress/fonts',
        fontsPath: '../fonts'
    })

    await downloader.execute()
})();