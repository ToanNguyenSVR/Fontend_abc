import type { Meta, StoryObj } from '@storybook/react';
import { InputText } from './';

const meta: Meta<typeof InputText> = {
  title: 'InputText',
  component: InputText,
};

export default meta;
type Story = StoryObj<typeof InputText>;

export const InputTextComponent: Story = {
  args: {},
};
