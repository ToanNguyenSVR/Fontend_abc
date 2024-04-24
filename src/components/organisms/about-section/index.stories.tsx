import type { Meta, StoryObj } from '@storybook/react';
import { AboutSection } from './';

const meta: Meta<typeof AboutSection> = {
  title: 'AboutSection',
  component: AboutSection,
};

export default meta;
type Story = StoryObj<typeof AboutSection>;

export const AboutSectionComponent: Story = {
  args: {},
};
