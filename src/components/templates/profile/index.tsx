import React, { useState } from 'react';
import './index.scss';

import { Layout } from 'antd';
import { ProfileForm } from '../../organisms/profile-form';
import PageTemplate from '../page-template';
export interface ProfileProps {}

export const Profile: React.FC<ProfileProps> = props => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
  };
  return (
    <PageTemplate>
      <ProfileForm />
    </PageTemplate>
  );
};
