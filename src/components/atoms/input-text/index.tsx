import React from 'react';
import './index.scss';
export interface InputTextProps {
  placeholder: string;
  type: string;
  bgc: string;
}

export const InputText: React.FC<InputTextProps> = ({ placeholder, type, bgc }) => {
  return (
    <>
      <input
        style={{
          backgroundColor: bgc,
        }}
        className="input-text"
        type={type}
        placeholder={placeholder}
      ></input>
    </>
  );
};
