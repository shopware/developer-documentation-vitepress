import type { Meta, StoryObj } from '@storybook/vue3';

import {DarkVariation, render} from "../stories/helpers";
import SwagNewsletter from './SwagNewsletter.vue';

const meta = {
  title: 'Swag/Newsletter',
  render: render(SwagNewsletter),
} satisfies Meta<typeof SwagNewsletter>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};

export const Dark: Story = DarkVariation(Default)
