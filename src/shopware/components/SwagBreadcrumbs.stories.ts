import type {Meta, StoryObj} from '@storybook/vue3';

import SwagBreadcrumbs from "./SwagBreadcrumbs.vue";
import {render, DarkVariation} from "../stories/helpers";

const meta = {
    title: 'Swag/Breadcrumbs',
    render: render(SwagBreadcrumbs),
} satisfies Meta<typeof SwagBreadcrumbs>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};

export const Dark: Story = DarkVariation(Default)