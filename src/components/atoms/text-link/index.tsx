import React from 'react';
import './index.scss';
export interface TextLinkProps {
  title: string;
  color: string;
}

export const TextLink: React.FC<TextLinkProps> = ({ title, color }) => {
  return (
    <a style={{ color: color }} className="text-link" href="">
      {title}
    </a>
  );
};
