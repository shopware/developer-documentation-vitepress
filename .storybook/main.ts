import config from "../packages/storybook/src/main";

export default config(
    {__dirname},
    {
        staticDirs: [
            '../src',
            '../node_modules/@shopware-ag/meteor-icon-kit',
        ]
    },
    {
        theme: {
            editLink: {
                editLink: 'test',
                text: 'Edit this page on GitHub',
            }
        },
    }
);
