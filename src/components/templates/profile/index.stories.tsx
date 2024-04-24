import type { Meta, StoryObj } from '@storybook/react';
import { Profile } from './';

const meta: Meta<typeof Profile> = {
  title: 'Profile',
  component: Profile,
};

export default meta;
type Story = StoryObj<typeof Profile>;

export const ProfileComponent: Story = {
  args: {},
};
