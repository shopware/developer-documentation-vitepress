import type {Meta, StoryObj} from '@storybook/vue3';

import RegistrationForm from "./RegistrationForm.vue";
import {render} from "../stories/helpers";

const meta = {
    title: 'Shopware/RegistrationForm',
    render: render(RegistrationForm),
} satisfies Meta<typeof RegistrationForm>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};