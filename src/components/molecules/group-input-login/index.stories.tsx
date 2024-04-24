import type { Meta, StoryObj } from '@storybook/react';
import { GroupInputLogin } from './';

const meta: Meta<typeof GroupInputLogin> = {
  title: 'GroupInputLogin',
  component: GroupInputLogin,
};

export default meta;
type Story = StoryObj<typeof GroupInputLogin>;

export const GroupInputLoginComponent: Story = {
  args: {},
};
