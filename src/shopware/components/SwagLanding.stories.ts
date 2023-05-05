import type {Meta, StoryObj} from '@storybook/vue3';

import SwagLanding from "./SwagLanding.vue";
import {DarkVariation, loremSentences, loremWords, render} from "../stories/helpers";

const template = [
    `<template #title>${loremWords(5)}</template>`,
    `<template #description>${loremSentences(5)}</template>`,
];

const meta = {
    title: 'Swag/Landing',
    render: render(SwagLanding, {
        slot: template.join(),
    }),
} satisfies Meta<typeof SwagLanding>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};

export const Dark: Story = DarkVariation(Default)