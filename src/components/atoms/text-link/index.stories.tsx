import type { Meta, StoryObj } from '@storybook/react';
import { TextLink } from './';

const meta: Meta<typeof TextLink> = {
  title: 'TextLink',
  component: TextLink,
};

export default meta;
type Story = StoryObj<typeof TextLink>;

export const TextLinkComponent: Story = {
  args: {},
};
