import type { Meta, StoryObj } from '@storybook/react';
import { FormLogin } from './';

const meta: Meta<typeof FormLogin> = {
  title: 'FormLogin',
  component: FormLogin,
};

export default meta;
type Story = StoryObj<typeof FormLogin>;

export const FormLoginComponent: Story = {
  args: {},
};
