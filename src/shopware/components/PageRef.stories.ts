import type {Meta, StoryObj} from '@storybook/vue3';

import PageRef from "./PageRef.vue";
import {DarkVariation, render} from "../stories/helpers";

const meta = {
    title: 'Default/PageRef',
    args: {
        page: 'my-page',
        title: 'My title',
        sub: 'My description'
    },
    render: render(PageRef),

} satisfies Meta<typeof PageRef>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};

export const Dark: Story = DarkVariation(Default)

