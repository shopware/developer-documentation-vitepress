import type { Meta, StoryObj } from '@storybook/vue3';

import {DarkVariation, render} from "../stories/helpers";
import SwagCheckbox from './SwagCheckbox.vue';

const meta = {
  title: 'Form/Checkbox',
  render: render(SwagCheckbox, {
    slot: 'My label',
  }),
} satisfies Meta<typeof SwagCheckbox>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};

export const Dark: Story = DarkVariation(Default)
