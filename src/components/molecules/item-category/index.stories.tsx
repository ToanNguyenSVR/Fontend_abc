import type { Meta, StoryObj } from '@storybook/react';
import { ItemCategory } from './';

const meta: Meta<typeof ItemCategory> = {
  title: 'ItemCategory',
  component: ItemCategory,
};

export default meta;
type Story = StoryObj<typeof ItemCategory>;

export const ItemCategoryComponent: Story = {
  args: {},
};
