import type {Meta, StoryObj} from '@storybook/vue3';

import SwagLandingCardList from "./SwagLandingCardList.vue";
import SwagLandingCard from "./SwagLandingCard.vue";
import SwagIcon from "./SwagIcon.vue";
import {render, DarkVariation} from "../stories/helpers";

const landingCard = '<SwagLandingCard icon="activity"><template #title>Landing Card Title</template><template #sub>Landing card sub</template></SwagLandingCard>';

const meta = {
    title: 'Swag/LandingCardList',
    render: render(SwagLandingCardList, {
        components: {SwagLandingCard, SwagIcon},
        slot: `<template #title>Title</template><template #description>Description</template><template #cards>${landingCard.repeat(4)}</template>`,
    }),
} satisfies Meta<typeof SwagLandingCardList>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};

export const Dark: Story = DarkVariation(Default)