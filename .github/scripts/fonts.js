/**
 * This file is used for downloading and caching Google Fonts because vite-plugin-webfont-dl is broken.
 * nano node_modules/.pnpm/google-fonts-helper@3.2.2/node_modules/google-fonts-helper/dist/index.cjs
 * remove 'del' import.
 * $ node ./.github/scripts/fonts.js
 */
const { download } = require('google-fonts-helper');

(async () => {
    const downloader = download('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap', {
        base64: false,
        overwriting: false,
        outputDir: './tmp-src/',
        stylePath: 'shopware/styles/fonts-inter.css',
        fontsDir: 'shopware/fonts',
        fontsPath: '../fonts'
    })

    await downloader.execute()
})();