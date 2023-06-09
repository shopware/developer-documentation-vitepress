import type {Meta, StoryObj} from '@storybook/vue3';

import SwagLandingCardList from "./SwagLandingCardList.vue";
import SwagLandingCard from "./SwagLandingCard.vue";
import SwagIcon from "./SwagIcon.vue";
import {DarkVariation, loremWords, loremParagraphs, render, swagLandingCards} from "../stories/helpers";

const meta = {
    title: 'SwagLanding/CardList',
    render: render(SwagLandingCardList, {
        components: {SwagLandingCard, SwagIcon},
        slot: `<template #title>${loremWords()}</template><template #description>${loremParagraphs(1)}</template><template #cards>${swagLandingCards(4)}</template>`,
    }),
} satisfies Meta<typeof SwagLandingCardList>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};

export const Dark: Story = DarkVariation(Default)