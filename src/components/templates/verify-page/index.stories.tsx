import type { Meta, StoryObj } from '@storybook/react';
import { VerifyPage } from './';

const meta: Meta<typeof VerifyPage> = {
  title: 'VerifyPage',
  component: VerifyPage,
};

export default meta;
type Story = StoryObj<typeof VerifyPage>;

export const VerifyPageComponent: Story = {
  args: {},
};
