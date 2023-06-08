import type {StorybookConfig} from "@storybook/vue3-vite";
import {mergeConfig} from 'vite';
import baseConfig from "vitepress-shopware-docs/config";
import path from "path";

const config = ({__dirname, __dirnamePrefix = '..'}: {
    __dirname: string,
    __dirnamePrefix?: string
}, storybookConfig = {}, viteConfig = {}) => ({
    stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        'storybook-addon-fetch-mock',
        'storybook-addon-pseudo-states',
    ],
    framework: {
        name: "@storybook/vue3-vite",
        options: {},
    },
    docs: {
        autodocs: "tag",
    },
    viteFinal: async (config, {configType}) => {
        const merged = mergeConfig(mergeConfig(mergeConfig(viteConfig, config), (await baseConfig()).vite), {
            resolve: {
                alias: {
                    'vitepress/dist': path.resolve(__dirname, __dirnamePrefix, './node_modules/vitepress/dist'),
                    vitepress: path.resolve(__dirname, __dirnamePrefix, './__mocks__/vitepress'),
                }
            },
        });
        console.log('merged', merged);
        return merged;
    },
    ...storybookConfig
} as StorybookConfig);

export default config;