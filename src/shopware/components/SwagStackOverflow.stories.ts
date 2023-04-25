import type {Meta, StoryObj} from '@storybook/vue3';

import SwagStackOverflow from "./SwagStackOverflow.vue";
import {render, DarkVariation} from "../stories/helpers";

const meta = {
    title: 'Swag/StackOverflow',
    render: render(SwagStackOverflow),
} satisfies Meta<typeof SwagStackOverflow>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};

export const Dark: Story = DarkVariation(Default)