import type {Meta, StoryObj} from '@storybook/vue3';

import SwagRelatedArticles from "./SwagRelatedArticles.vue";
import PageRef from "./PageRef.vue";
import {render} from "../stories/helpers";

const meta = {
    title: 'Shopware/SwagRelatedArticles',
    render: render(SwagRelatedArticles, {components: {PageRef}}),
    parameters: {
        fetchMock: {
            debug: true,
            mocks: [
                {
                    matcher: {
                        url: 'https://knowledge-index.shopware.com/neighbours',
                        method: 'POST',
                    },
                    response: {
                        status: 200,
                        body: {
                            results: [
                                {
                                    id: 'first-id',
                                    heading: 'First ID',
                                    description: 'First description',
                                },
                                {
                                    id: 'second/id',
                                    heading: 'Second ID',
                                    description: 'Second description',
                                }
                            ]
                        },
                    },
                },
            ],
        },
    },
} satisfies Meta<typeof SwagRelatedArticles>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};