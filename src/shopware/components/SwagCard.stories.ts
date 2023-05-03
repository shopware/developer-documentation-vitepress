import type {Meta, StoryObj} from '@storybook/vue3';

import SwagCard from "./SwagCard.vue";
import PageRef from "./PageRef.vue";
import {DarkVariation, loremWords, loremParagraphs, render} from "../stories/helpers";

const meta = {
    title: 'Swag/Card',
    render: render(SwagCard, {
        components: {PageRef},
        slot: `<template #title>${loremWords()}</template><template #description>${loremParagraphs(1, 0, 'plain')}</template>`,
    }),
} satisfies Meta<typeof SwagCard>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};

export const Dark: Story = DarkVariation(Default)