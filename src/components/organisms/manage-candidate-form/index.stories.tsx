import type { Meta, StoryObj } from '@storybook/react';
import { ManageCandidateForm } from './';

const meta: Meta<typeof ManageCandidateForm> = {
  title: 'ManageCandidateForm',
  component: ManageCandidateForm,
};

export default meta;
type Story = StoryObj<typeof ManageCandidateForm>;

export const ManageCandidateFormComponent: Story = {
  args: {},
};
