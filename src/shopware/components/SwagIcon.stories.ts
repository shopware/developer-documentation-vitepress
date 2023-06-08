import type {Meta, StoryObj} from '@storybook/vue3';

import SwagIcon from "./SwagIcon.vue";
import {render, DarkVariation} from "../stories/helpers";

const meta = {
    title: 'Elements/SwagIcon',
    render: render(SwagIcon),
} satisfies Meta<typeof SwagIcon>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
    args: {
        icon: 'activity'
    }
};

export const Solid: Story = {
    args: {
        type: 'solid',
        icon: 'activity',
    }
};

export const Dark: Story = DarkVariation(Default)