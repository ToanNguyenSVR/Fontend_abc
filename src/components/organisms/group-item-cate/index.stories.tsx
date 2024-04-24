import type { Meta, StoryObj } from '@storybook/react';
import { GroupItemCate } from './';

const meta: Meta<typeof GroupItemCate> = {
  title: 'GroupItemCate',
  component: GroupItemCate,
};

export default meta;
type Story = StoryObj<typeof GroupItemCate>;

export const GroupItemCateComponent: Story = {
  args: {},
};
