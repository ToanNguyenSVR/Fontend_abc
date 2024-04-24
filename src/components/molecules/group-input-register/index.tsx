import React from 'react';
import './index.scss';
import { InputText } from '../../atoms/input-text';
export interface GroupInputRegisterProps {}

export const GroupInputRegister: React.FC<GroupInputRegisterProps> = props => {
  return (
    <>
      <InputText placeholder="Enter Email" type="text" bgc="#F0EFFF" />
      <InputText placeholder="Create User name" type="text" bgc="#F0EFFF" />
      <InputText placeholder="Contact number" type="text" bgc="#F0EFFF" />
      <InputText placeholder="Password" type="password" bgc="#F0EFFF" />
      <InputText placeholder="Confrim Password" type="password" bgc="#F0EFFF" />
    </>
  );
};
