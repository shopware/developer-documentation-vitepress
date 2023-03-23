import type {Meta, StoryObj} from '@storybook/vue3';

import VPNavBar from "./VPNavBar.vue";

const meta = {
    title: 'Component/VPNavBar',
    component: VPNavBar,
    args: {
        page: 'my-page'
    },
    /*render: (args: any) => ({
        components: {VPNav},
        setup() {
            return {args}
        },
        template: '<Tabs><Tab title="First tab">First tab content</Tab><Tab title="Second tab">Second tab content</Tab></Tabs>'
    })*/
} satisfies Meta<typeof VPNavBar>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Primary: Story = {
    args: {
        primary: true,
        label: 'Button',
    },
};