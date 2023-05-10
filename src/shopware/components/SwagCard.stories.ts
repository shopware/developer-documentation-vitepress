import type {Meta, StoryObj} from '@storybook/vue3';

import SwagCard from "./SwagCard.vue";
import {DarkVariation, loremWords, loremParagraphs, render, HoverVariation} from "../stories/helpers";

const meta = {
    title: 'Swag/Card',
    render: render(SwagCard, {
        slot: `<template #title>${loremWords()}</template><template #description>${loremParagraphs(1, 0, 'plain')}</template>`,
    }),
} satisfies Meta<typeof SwagCard>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};

export const DefaultHover: Story = HoverVariation(Default);

export const Dark: Story = DarkVariation(Default);

export const DarkHover: Story = HoverVariation(Dark);