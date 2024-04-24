import type { Meta, StoryObj } from '@storybook/react';
import { ProfileForm } from './';

const meta: Meta<typeof ProfileForm> = {
  title: 'ProfileForm',
  component: ProfileForm,
};

export default meta;
type Story = StoryObj<typeof ProfileForm>;

export const ProfileFormComponent: Story = {
  args: {},
};
