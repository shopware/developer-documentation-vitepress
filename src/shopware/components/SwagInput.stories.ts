import type { Meta, StoryObj } from '@storybook/vue3';

import {DarkVariation, render} from "../stories/helpers";
import SwagInput from './SwagInput.vue';

const meta = {
  title: 'Form/Input',
  render: render(SwagInput),
} satisfies Meta<typeof SwagInput>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};

export const Dark: Story = DarkVariation(Default)
