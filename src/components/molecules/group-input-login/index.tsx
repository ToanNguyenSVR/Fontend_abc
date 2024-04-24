import React from 'react';
import './index.scss';
import { InputText } from '../../atoms/input-text';
export interface GroupInputLoginProps {}

export const GroupInputLogin: React.FC<GroupInputLoginProps> = props => {
  return (
    <>
      <InputText placeholder="Enter email or user name" type="text" bgc="#F0EFFF" />
      <InputText placeholder="Password" type="password" bgc="#F0EFFF" />
    </>
  );
};
