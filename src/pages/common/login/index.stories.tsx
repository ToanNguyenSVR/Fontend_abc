import type { Meta, StoryObj } from '@storybook/react';
import { Login } from '.';

const meta: Meta<typeof Login> = {
  title: 'Login',
  component: Login,
};

export default meta;
type Story = StoryObj<typeof Login>;

export const LoginComponent: Story = {
  args: {},
};
