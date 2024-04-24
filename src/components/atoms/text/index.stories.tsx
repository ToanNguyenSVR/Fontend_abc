import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './';

const meta: Meta<typeof Text> = {
  title: 'Text',
  component: Text,
};

export default meta;
type Story = StoryObj<typeof Text>;

export const TextComponent: Story = {
  args: {},
};
