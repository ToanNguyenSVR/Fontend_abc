import React, { FC } from 'react';
import './index.scss';
interface PageTemplateProps {
  children: React.ReactNode;
}

const PageTemplate: FC<PageTemplateProps> = ({ children }) => {
  return <div className="page">{children}</div>;
};

export default PageTemplate;
