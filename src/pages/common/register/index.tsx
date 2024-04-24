import React from 'react';
import './index.scss';

import { RegisterForm } from '../../../components/organisms/register-form';

export interface RegisterProps {}

export const Register: React.FC<RegisterProps> = props => {
  return (
    <div className="register">
      <div className="register__form">
        <img src="Rectangle2.png" alt="" />
        <RegisterForm />
      </div>
    </div>
  );
};
