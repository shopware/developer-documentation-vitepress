import type {Meta, StoryObj} from '@storybook/vue3';

import Elements from "./Elements.vue";
import {DarkVariation, render} from "../stories/helpers";

const meta = {
    title: 'General/Elements',
    render: render(Elements),
} satisfies Meta<typeof Elements>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};

export const Dark: Story = DarkVariation(Default)