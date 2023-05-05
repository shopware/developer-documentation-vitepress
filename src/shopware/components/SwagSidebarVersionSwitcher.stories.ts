import type {Meta, StoryObj} from '@storybook/vue3';

import SwagSidebarVersionSwitcher from "./SwagSidebarVersionSwitcher.vue";
import {render, DarkVariation} from "../stories/helpers";

const meta = {
    title: 'Swag/SidebarVersionSwitcher',
    render: render(SwagSidebarVersionSwitcher),
} satisfies Meta<typeof SwagSidebarVersionSwitcher>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};

export const Dark: Story = DarkVariation(Default)