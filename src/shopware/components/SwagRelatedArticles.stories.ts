import type {Meta, StoryObj} from '@storybook/vue3';

import SwagRelatedArticles from "./SwagRelatedArticles.vue";

const meta = {
    title: 'Component/SwagRelatedArticles',
    component: SwagRelatedArticles,
    args: {
        page: 'my-page'
    }
} satisfies Meta<typeof SwagRelatedArticles>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Primary: Story = {
    args: {
        primary: true,
        label: 'Button',
    },
};