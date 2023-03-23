import type {Meta, StoryObj} from '@storybook/vue3';

import Tab from "./Tab.vue";

const meta = {
    title: 'Component/Tab',
    component: Tab,
    args: {
        page: 'my-page'
    }
} satisfies Meta<typeof Tab>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Primary: Story = {
    args: {
        primary: true,
        label: 'Button',
    },
};