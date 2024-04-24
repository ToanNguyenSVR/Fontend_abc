import type { Meta, StoryObj } from '@storybook/react';
import { VerifyForm } from './';

const meta: Meta<typeof VerifyForm> = {
  title: 'VerifyForm',
  component: VerifyForm,
};

export default meta;
type Story = StoryObj<typeof VerifyForm>;

export const VerifyFormComponent: Story = {
  args: {},
};
