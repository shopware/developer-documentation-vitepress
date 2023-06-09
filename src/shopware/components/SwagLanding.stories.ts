import type {Meta, StoryObj} from '@storybook/vue3';

import SwagLanding from "./SwagLanding.vue";
import SwagLandingCard from "./SwagLandingCard.vue";
import SwagLandingCardList from "./SwagLandingCardList.vue";
import PageRef from "./PageRef.vue";
import {DarkVariation, loremSentences, loremWords, render, swagLandingCards} from "../stories/helpers";

const template = [
    `<template #title>${loremWords(5)}</template>`,
    `<template #description>${loremSentences(5)}</template>`,
    `<template #ctas><PageRef title="${loremWords(5, 0)}" /><PageRef title="${loremWords(5, 1)}" /></template>`,
    `<template #exposed>`,
    `<SwagLandingCardList>`,
    `<template #cards>`,
    swagLandingCards(4),
    `</template>`,
    `</SwagLandingCardList>`,
    `</template>`,
];

const meta = {
    title: 'SwagLanding/SwagLanding',
    render: render(SwagLanding, {
        components: {PageRef, SwagLandingCardList, SwagLandingCard},
        slot: template.join(""),
    }),
} satisfies Meta<typeof SwagLanding>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};

export const Dark: Story = DarkVariation(Default)