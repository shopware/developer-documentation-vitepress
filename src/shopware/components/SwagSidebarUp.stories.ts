import type {Meta, StoryObj} from '@storybook/vue3';

import SwagSidebarUp from "./SwagSidebarUp.vue";
import {render, DarkVariation} from "../stories/helpers";

const meta = {
    title: 'Sidebar/SwagSidebarUp',
    render: render(SwagSidebarUp),
} satisfies Meta<typeof SwagSidebarUp>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};

export const Dark: Story = DarkVariation(Default)