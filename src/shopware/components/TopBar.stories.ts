import type {Meta, StoryObj} from '@storybook/vue3';

import TopBar from "./TopBar.vue";

const meta = {
    title: 'Component/TopBar',
    component: TopBar,
    args: {
        page: 'my-page'
    }
} satisfies Meta<typeof TopBar>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Primary: Story = {
    args: {
        primary: true,
        label: 'Button',
    },
};