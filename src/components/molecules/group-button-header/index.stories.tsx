import type { Meta, StoryObj } from '@storybook/react';
import { GroupButtonHeader } from './';

const meta: Meta<typeof GroupButtonHeader> = {
  title: 'GroupButtonHeader',
  component: GroupButtonHeader,
};

export default meta;
type Story = StoryObj<typeof GroupButtonHeader>;

export const GroupButtonHeaderComponent: Story = {
  args: {},
};
