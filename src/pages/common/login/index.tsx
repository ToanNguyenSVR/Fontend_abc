import { useState } from 'react';
import './index.scss';
import { FormLogin } from '../../../components/organisms/form-login';
import { notification } from 'antd';
export interface LoginProps {}

export const Login: React.FC<LoginProps> = props => {
  const [api, contextHolder] = notification.useNotification();
  return (
    <div className="login">
      {contextHolder}
      <div className="login__form">
        <img src="rectangle.png" alt="" />
        <FormLogin />
      </div>
    </div>
  );
};
