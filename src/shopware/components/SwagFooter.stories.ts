import type {Meta, StoryObj} from '@storybook/vue3';

import SwagFooter from "./SwagFooter.vue";
import {render, DarkVariation} from "../stories/helpers";
import VPNavBarSocialLinks from "../../../node_modules/vitepress/dist/client/theme-default/components/VPNavBarSocialLinks.vue";
import {mockRoute, unmockRoute} from "../../../__mocks__/vitepress";


const meta = {
    title: 'Layout/SwagFooter',
    render: render(SwagFooter, {
        rootClass: null,
        components: {VPNavBarSocialLinks},
        beforeMount() {
            mockRoute({
                path: '/',
                data: {
                    relativePath: 'index.md',
                }
            });
        },
        unmounted() {
            unmockRoute();
        }
    }),
} satisfies Meta<typeof SwagFooter>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};

export const Dark: Story = DarkVariation(Default)