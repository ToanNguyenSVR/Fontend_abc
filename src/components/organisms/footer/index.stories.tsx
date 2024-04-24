import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './';

const meta: Meta<typeof Footer> = {
  title: 'Footer',
  component: Footer,
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const FooterComponent: Story = {
  args: {},
};
