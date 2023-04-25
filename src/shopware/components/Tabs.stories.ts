import type {Meta, StoryObj} from '@storybook/vue3';

import Tabs from "./Tabs.vue";
import Tab from "./Tab.vue";
import {DarkVariation, render} from "../stories/helpers";

const meta = {
    title: 'Default/Tabs',
    render: render(Tabs, {
        components: {Tab},
        slot: '<Tab title="First tab">First tab content</Tab><Tab title="Second tab">Second tab content</Tab>'
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