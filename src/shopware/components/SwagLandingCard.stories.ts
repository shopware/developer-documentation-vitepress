import type {Meta, StoryObj} from '@storybook/vue3';

import SwagLandingCard from "./SwagLandingCard.vue";
import PageRef from "./PageRef.vue";
import {DarkVariation, loremWords, loremSentences, render, HoverVariation} from "../stories/helpers";

const meta = {
    title: 'SwagLanding/Card',
    render: render(SwagLandingCard, {
        components: {PageRef},
        slot: `<template #title>${loremWords()}</template><template #sub>${loremSentences()}</template>`,
    }),
} satisfies Meta<typeof SwagLandingCard>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};

export const DefaultHover: Story = HoverVariation(Default, '.SwagLandingCard');

export const Dark: Story = DarkVariation(Default);

export const DarkHover: Story = HoverVariation(Dark, '.SwagLandingCard');