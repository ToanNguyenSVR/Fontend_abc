import type { Meta, StoryObj } from '@storybook/react';
import { Register } from '.';

const meta: Meta<typeof Register> = {
  title: 'Register',
  component: Register,
};

export default meta;
type Story = StoryObj<typeof Register>;

export const RegisterComponent: Story = {
  args: {},
};
