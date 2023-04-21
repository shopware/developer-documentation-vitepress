import type {Meta, StoryObj} from '@storybook/vue3';

import YoutubeRef from "./YoutubeRef.vue";
import {DarkVariation, render} from "../stories/helpers";

const meta = {
    title: 'Shopware/YoutubeRef',
    args: {
        video: 'FgTX3Q5iFNg',
        title: 'Release News: Rules, Flows & more in Shopware 6.5 RC'
    },
    render: render(YoutubeRef)
} satisfies Meta<typeof YoutubeRef>;

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {}

export const Dark: Story = DarkVariation(Default)