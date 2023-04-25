import type {Meta, StoryObj} from '@storybook/vue3';

import SwagLandingCard from "./SwagLandingCard.vue";
import PageRef from "./PageRef.vue";
import {render, DarkVariation} from "../stories/helpers";

const meta = {
    title: 'Swag/LandingCard',
    render: render(SwagLandingCard, {
        components: {PageRef},
        slot: `<template #title>Landing Card Title</template><template #sub>Landing card sub</template>`,
    }),
} satisfies Meta<typeof SwagLandingCard>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};

export const Dark: Story = DarkVariation(Default)