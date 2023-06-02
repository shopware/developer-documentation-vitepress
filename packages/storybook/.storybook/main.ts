import type { StorybookConfig } from "@storybook/vue3-vite";
import { mergeConfig } from 'vite';
import baseConfig from "vitepress-shopware-docs/config";

const config: StorybookConfig = {
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
    const merged = mergeConfig(mergeConfig(config, (await baseConfig()).vite), {
      resolve: {
        alias: {
          vitepress: '/__mocks__/vitepress',
        }
      },
    });
    console.log('merged', merged);
    return merged;
  }
};

export default config;