import {defineConfig} from 'vitest/config'
import path from 'path';

const timeout = 60_000
export default ({__dirname, __dirnamePrefix = ''}: { __dirname: string, __dirnamePrefix?: string }) => {
    console.log({
        '@shopware-docs/vitest': path.resolve(__dirname, __dirnamePrefix || '', './node_modules/@shopware-docs/vitest/src'),
        '@shopware-docs/vitepress': path.resolve(__dirname, __dirnamePrefix || '', './node_modules/@shopware-docs/vitepress/src'),
        '@shopware-docs/storybook': path.resolve(__dirname, __dirnamePrefix || '', './node_modules/@shopware-docs/storybook/src'),
        '@shopware-docs/cli': path.resolve(__dirname, __dirnamePrefix || '', './node_modules/@shopware-docs/cli/src'),
    });
    return defineConfig({
        test: {
            //root: '../../src/',
            setupFiles: ['vitestSetup.ts'],
            globalSetup: ['__tests__/e2e/vitestGlobalSetup.ts'],
            testTimeout: timeout,
            hookTimeout: timeout,
            teardownTimeout: timeout,
            globals: true,
        },
        resolve: {
            alias: {
                '@shopware-docs/vitest': path.resolve(__dirname, __dirnamePrefix || '', './node_modules/@shopware-docs/vitest/src'),
                '@shopware-docs/vitepress': path.resolve(__dirname, __dirnamePrefix || '', './node_modules/@shopware-docs/vitepress/src'),
                '@shopware-docs/storybook': path.resolve(__dirname, __dirnamePrefix || '', './node_modules/@shopware-docs/storybook/src'),
                '@shopware-docs/cli': path.resolve(__dirname, __dirnamePrefix || '', './node_modules/@shopware-docs/cli/src'),
            }
        }
    });
}