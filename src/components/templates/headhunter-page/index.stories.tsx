import type { Meta, StoryObj } from '@storybook/react';
import { HeadhunterPage } from './';

const meta: Meta<typeof HeadhunterPage> = {
  title: 'HeadhunterPage',
  component: HeadhunterPage,
};

export default meta;
type Story = StoryObj<typeof HeadhunterPage>;

export const HeadhunterPageComponent: Story = {
  args: {},
};
