import type {Meta, StoryObj} from '@storybook/vue3';

import SwagCard from "./SwagCard.vue";
import PageRef from "./PageRef.vue";
import {render, DarkVariation} from "../stories/helpers";

const meta = {
    title: 'Swag/Card',
    render: render(SwagCard, {
        components: {PageRef},
        slot: `<template #title>Card Title</template><template #description>Card description</template>`,
    }),
} satisfies Meta<typeof SwagCard>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};

export const Dark: Story = DarkVariation(Default)