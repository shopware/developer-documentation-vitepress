import type {Meta, StoryObj} from '@storybook/vue3';

import ActionItem from "./ActionItem.vue";
import {DarkVariation, loremWords, loremSentences, render} from "../stories/helpers";

const meta = {
    title: 'General/ActionItem',
    args: {
        heading: loremWords(),
    },
    render: render(ActionItem, {
        slot: loremSentences(3)
    }),
} satisfies Meta<typeof ActionItem>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};

export const Dark: Story = DarkVariation(Default)