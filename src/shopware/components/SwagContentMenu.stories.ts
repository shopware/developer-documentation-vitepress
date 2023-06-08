import type {Meta, StoryObj} from '@storybook/vue3';

import SwagContentMenu from "./SwagContentMenu.vue";
import PageRef from "./PageRef.vue";
import {render, DarkVariation} from "../stories/helpers";

const meta = {
    title: 'Layout/SwagContentMenu',
    render: render(SwagContentMenu, {
        components: {PageRef}
    }),
} satisfies Meta<typeof SwagContentMenu>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};

export const Dark: Story = DarkVariation(Default)