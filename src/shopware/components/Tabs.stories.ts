import type {Meta, StoryObj} from '@storybook/vue3';

import Tabs from "./Tabs.vue";
import Tab from "./Tab.vue";

const meta = {
    title: 'Component/Tabs',
    component: Tabs,
    args: {
        page: 'my-page'
    },
    render: (args: any) => ({
        components: {Tabs, Tab},
        setup() {
            return {args}
        },
        template: '<Tabs><Tab title="First tab">First tab content</Tab><Tab title="Second tab">Second tab content</Tab></Tabs>'
    })
} satisfies Meta<typeof Tabs>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Primary: Story = {
    args: {
        primary: true,
        label: 'Button',
    },
};