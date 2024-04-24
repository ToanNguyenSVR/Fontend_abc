import React from 'react';
import './index.scss';
export interface ButtonProps {
  title: string;
  bgcolor?: string;
  color?: string;
}

export const Button: React.FC<ButtonProps> = ({ title, bgcolor, color }) => {
  return (
    <div className="btn_container">
      <button className="btn" style={{ color, backgroundColor: bgcolor }}>
        {title}
      </button>
    </div>
  );
};
