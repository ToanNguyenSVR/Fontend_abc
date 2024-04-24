import type { Meta, StoryObj } from '@storybook/react';
import { GroupInputRegister } from './';

const meta: Meta<typeof GroupInputRegister> = {
  title: 'GroupInputRegister',
  component: GroupInputRegister,
};

export default meta;
type Story = StoryObj<typeof GroupInputRegister>;

export const GroupInputRegisterComponent: Story = {
  args: {},
};
