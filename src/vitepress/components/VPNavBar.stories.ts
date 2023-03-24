import type {Meta, StoryObj} from '@storybook/vue3';

import VPNavBar from "./VPNavBar.vue";
import {render} from "../../shopware/stories/helpers";

const meta = {
    title: 'Vitepress/VPNavBar',
    render: render(VPNavBar),
} satisfies Meta<typeof VPNavBar>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};