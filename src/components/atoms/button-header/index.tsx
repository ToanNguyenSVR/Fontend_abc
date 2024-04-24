import React from 'react';
import './index.scss';
export interface ButtonHeaderProps {
  title: string;
  color: string;
  bgrcolor: string;
  isActive: boolean;
}

export const ButtonHeader: React.FC<ButtonHeaderProps> = ({ title, color, bgrcolor, isActive }) => {
  return (
    <a
      className={`button-header ${isActive ? 'active' : ''}`}
      style={{ color: color, backgroundColor: bgrcolor }}
      href=""
    >
      {title}
    </a>
  );
};
