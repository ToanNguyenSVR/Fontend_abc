import type { Meta, StoryObj } from '@storybook/react';
import { VerifyCompany } from './';

const meta: Meta<typeof VerifyCompany> = {
  title: 'VerifyCompany',
  component: VerifyCompany,
};

export default meta;
type Story = StoryObj<typeof VerifyCompany>;

export const VerifyCompanyComponent: Story = {
  args: {},
};
