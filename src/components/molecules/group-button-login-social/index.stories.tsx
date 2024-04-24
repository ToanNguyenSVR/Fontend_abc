import type { Meta, StoryObj } from '@storybook/react';
import { GroupButtonLoginSocial } from './';

const meta: Meta<typeof GroupButtonLoginSocial> = {
  title: 'GroupButtonLoginSocial',
  component: GroupButtonLoginSocial,
};

export default meta;
type Story = StoryObj<typeof GroupButtonLoginSocial>;

export const GroupButtonLoginSocialComponent: Story = {
  args: {},
};
