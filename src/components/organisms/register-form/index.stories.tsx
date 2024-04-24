import type { Meta, StoryObj } from '@storybook/react';
import { RegisterForm } from './';

const meta: Meta<typeof RegisterForm> = {
  title: 'RegisterForm',
  component: RegisterForm,
};

export default meta;
type Story = StoryObj<typeof RegisterForm>;

export const RegisterFormComponent: Story = {
  args: {},
};
