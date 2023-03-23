import type {Meta, StoryObj} from '@storybook/vue3';

import PageRef from "./PageRef.vue";
import Mock from "./Mock.vue";

const meta = {
    title: 'Component/PageRef',
    component: PageRef,
    args: {
        page: 'my-page',
        title: 'My title',
        sub: 'My description'
    },
    render: (args: any) => ({
        components: {Mock, PageRef},
        setup() {
            return {args}
        },
        template: '<Mock class="vt-doc"><PageRef v-bind="args" /></Mock>'
    })
    /*decorators: [
        () => {
            return {
                template: '<div style="margin: 3em;"><story /></div>',
            };
        }
    ]*/
} satisfies Meta<typeof PageRef>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Primary: Story = {
    /*args: {
        primary: true,
        label: 'Button',
    },*/
};