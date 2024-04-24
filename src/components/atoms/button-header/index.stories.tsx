import type { Meta, StoryObj } from '@storybook/react';
import { ButtonHeader } from './';

const meta: Meta<typeof ButtonHeader> = {
  title: 'ButtonHeader',
  component: ButtonHeader,
};

export default meta;
type Story = StoryObj<typeof ButtonHeader>;

export const ButtonHeaderComponent: Story = {
  args: {},
};
