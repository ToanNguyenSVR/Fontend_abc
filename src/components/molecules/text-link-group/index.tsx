import React from 'react';
import './index.scss';
import { TextLink } from '../../atoms/text-link';
export interface TextLinkGroupProps {
  isShown: boolean;
}

export const TextLinkGroup: React.FC<TextLinkGroupProps> = ({ isShown }) => {
  return (
    <nav className={`${isShown ? 'active' : ''}`}>
      <ul>
        <li>
          <TextLink title="Home" color="#000" />
        </li>
        <li>
          <TextLink title="About" color="#000" />
        </li>
        <li>
          <TextLink title="Blog" color="#000" />
        </li>
        <li>
          <TextLink title="Pages" color="#000" />
        </li>
        <li>
          <TextLink title="Contact" color="#000" />
        </li>
      </ul>
    </nav>
  );
};
