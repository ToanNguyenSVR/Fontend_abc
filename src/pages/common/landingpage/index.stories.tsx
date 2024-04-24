import type { Meta, StoryObj } from '@storybook/react';
import { Landing } from '.';

const meta: Meta<typeof Landing> = {
  title: 'Landing',
  component: Landing,
};

export default meta;
type Story = StoryObj<typeof Landing>;

export const LandingComponent: Story = {
  args: {},
};
