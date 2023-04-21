import type {Meta, StoryObj} from '@storybook/vue3';

import LandingWrapper from "./LandingWrapper.vue";
import {DarkVariation, render} from "../stories/helpers";

const meta = {
    title: 'Shopware/LandingWrapper',
    render: render(LandingWrapper),
} satisfies Meta<typeof LandingWrapper>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};

export const Dark: Story = DarkVariation(Default)