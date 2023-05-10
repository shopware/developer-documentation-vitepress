import type {Meta, StoryObj} from '@storybook/vue3';

import PageRef from "./PageRef.vue";
import {DarkVariation, HoverVariation, loremSentences, loremWords, render} from "../stories/helpers";

const meta = {
    title: 'Default/PageRef',
    args: {
        page: 'my-page',
        title: loremWords(),
        sub: loremSentences(2)
    },
    render: render(PageRef),

} satisfies Meta<typeof PageRef>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};

export const DefaultHover: Story = HoverVariation(Default);

export const Dark: Story = DarkVariation(Default);

export const DarkHover: Story = HoverVariation(Dark);