import React from 'react';
import './index.scss';
import { ButtonHeader } from '../../atoms/button-header';
export interface GroupButtonHeaderProps {}

export const GroupButtonHeader: React.FC<GroupButtonHeaderProps> = props => {
  return (
    <>
      <ButtonHeader title="Login" color="#1657FF" bgrcolor="#FFF" isActive />
      <ButtonHeader title="Register" color="#1657FF" bgrcolor="#FFF" isActive={false} />
    </>
  );
};
