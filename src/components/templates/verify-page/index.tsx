import React, { useEffect, useState } from 'react';
import './index.scss';

import { VerifyForm } from '../../organisms/verify-form';
import { VerifyCompany } from '../../organisms/verify-company';
import { Layout } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import Header from '../../organisms/header';
export interface VerifyPageProps {}

export const VerifyPage: React.FC<VerifyPageProps> = props => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
  };
  const [accounType, setAccounType] = useState<any>('');
  const user = useSelector((state: RootState) => state.user);
  console.log(user);

  useEffect(() => {
    if (user) {
      setAccounType(user?.accountType);
    }
  }, []);

  let content = null;
  if (accounType?.toString() == 'HEADHUNTER') {
    content = <VerifyForm />;
  } else if (accounType?.toString() == 'MANAGER') {
    content = <VerifyCompany />;
  }

  return (
    <div className="verify-page">
      <Layout>
        <Header />
        <div className="verify-page__form">{content}</div>
      </Layout>
    </div>
  );
};
