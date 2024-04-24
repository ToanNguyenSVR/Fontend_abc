---
to: src/components/<%= h.inflection.pluralize(level) %>/<%= h.changeCase.param(name) %>/index.stories.tsx
sh: prettier --write src/components/<%= h.inflection.pluralize(level) %>/<%= h.changeCase.param(name) %>/index.stories.tsx
---

import type { Meta, StoryObj } from '@storybook/react';
import { <%= h.changeCase.pascal(name) %> } from './';

const meta: Meta<typeof <%= h.changeCase.pascal(name) %>> = {
  title: '<%= h.changeCase.pascal(name) %>',
  component: <%= h.changeCase.pascal(name) %>,
};

export default meta;
type Story = StoryObj<typeof <%= h.changeCase.pascal(name) %>>;

export const <%= h.changeCase.pascal(name) %>Component: Story = {
  args: {},
};