import type {Meta, StoryObj} from '@storybook/vue3';

import TopBar from "./TopBar.vue";
import {render} from "../stories/helpers";

const meta = {
    title: 'Shopware/TopBar',
    render: render(TopBar)
} satisfies Meta<typeof TopBar>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};
