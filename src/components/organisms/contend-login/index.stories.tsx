import type { Meta, StoryObj } from '@storybook/react';
import { ContendLogin } from './';

const meta: Meta<typeof ContendLogin> = {
  title: 'ContendLogin',
  component: ContendLogin,
};

export default meta;
type Story = StoryObj<typeof ContendLogin>;

export const ContendLoginComponent: Story = {
  args: {},
};
