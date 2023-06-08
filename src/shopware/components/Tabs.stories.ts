import type {Meta, StoryObj} from '@storybook/vue3';

import Tabs from "./Tabs.vue";
import Tab from "./Tab.vue";
import {DarkVariation, loremWords, loremParagraphs, render} from "../stories/helpers";

const meta = {
    title: 'Components/Tabs',
    render: render(Tabs, {
        components: {Tab},
        slot: [
            `<Tab title="${loremWords(1)}">${loremParagraphs(3)}</Tab>`,
            `<Tab title="${loremWords(3)}">${loremParagraphs(1)}</Tab>`
        ].join('')
    }),
} satisfies Meta<typeof Tabs>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
    args: {
        primary: true,
        label: 'Button',
    },
};

export const Dark: Story = DarkVariation(Default)