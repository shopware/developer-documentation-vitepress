import type {Meta, StoryObj} from '@storybook/vue3';

import ActionItem from "./ActionItem.vue";
import {render} from "../stories/helpers";

const meta = {
    title: 'Shopware/ActionItem',
    args: {
        heading: 'Headless Frontends',
    },
    render: render(ActionItem, {
        slot: 'Build custom frontends on top of our Store API and get going with our quick start tutorials or dedicated SDKs for API development.'
    }),
} satisfies Meta<typeof ActionItem>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};