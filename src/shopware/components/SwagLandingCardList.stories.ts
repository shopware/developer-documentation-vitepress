import type {Meta, StoryObj} from '@storybook/vue3';

import SwagLandingCardList from "./SwagLandingCardList.vue";
import SwagLandingCard from "./SwagLandingCard.vue";
import SwagIcon from "./SwagIcon.vue";
import {DarkVariation, loremWords, loremSentences, loremParagraphs, render} from "../stories/helpers";

const landingCards = (num: number) => Array.apply(null, Array(num))
    .map((u, i) => `<SwagLandingCard icon="activity"><template #title>${loremWords([3, 8], i)}</template><template #sub>${loremSentences([3, 5], i)}</template></SwagLandingCard>`)
    .join("")

const meta = {
    title: 'Swag/LandingCardList',
    render: render(SwagLandingCardList, {
        components: {SwagLandingCard, SwagIcon},
        slot: `<template #title>${loremWords()}</template><template #description>${loremParagraphs(1)}</template><template #cards>${landingCards(4)}</template>`,
    }),
} satisfies Meta<typeof SwagLandingCardList>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};

export const Dark: Story = DarkVariation(Default)