import type { Meta, StoryObj } from '@storybook/react';
import { TextLinkGroup } from './';

const meta: Meta<typeof TextLinkGroup> = {
  title: 'TextLinkGroup',
  component: TextLinkGroup,
};

export default meta;
type Story = StoryObj<typeof TextLinkGroup>;

export const TextLinkGroupComponent: Story = {
  args: {},
};
