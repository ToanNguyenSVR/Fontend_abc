import React from 'react';
import './index.scss';
export interface TextProps {
  content?: string;
  color?: string;
  fontWeight?: string;
  fontSize?: string;
  lineHeight?: string;
  textAlign?: 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | 'match-parent';
  margin?: string;
}

export const Text: React.FC<TextProps> = ({
  content,
  color,
  fontWeight,
  fontSize,
  lineHeight,
  textAlign,
  margin,
}) => {
  return (
    <p style={{ color, fontWeight, fontSize, lineHeight, textAlign, margin }} className="text">
      {content}
    </p>
  );
};
