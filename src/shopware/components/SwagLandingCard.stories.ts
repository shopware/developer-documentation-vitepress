import type {Meta, StoryObj} from '@storybook/vue3';

import SwagLandingCard from "./SwagLandingCard.vue";
import PageRef from "./PageRef.vue";
import {DarkVariation, loremWords, loremSentences, render} from "../stories/helpers";

const meta = {
    title: 'Swag/LandingCard',
    render: render(SwagLandingCard, {
        components: {PageRef},
        slot: `<template #title>${loremWords()}</template><template #sub>${loremSentences()}</template>`,
    }),
} satisfies Meta<typeof SwagLandingCard>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};

export const Dark: Story = DarkVariation(Default)