
import React from 'react';
import { BilingualText } from '../types';

interface Props {
  text: BilingualText;
  className?: string;
  enClassName?: string;
  krClassName?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

const BilingualDisplay: React.FC<Props> = ({ 
  text, 
  className = "", 
  enClassName = "", 
  krClassName = "text-gray-400 font-light",
  as: Component = 'div' 
}) => {
  // Use any to bypass IntrinsicAttributes restrictions on dynamic tags when children are present
  const Tag = Component as any;
  return (
    <Tag className={`flex flex-col gap-1 ${className}`}>
      <span className={enClassName}>{text.en}</span>
      <span className={`text-[0.9em] leading-relaxed ${krClassName}`}>{text.kr}</span>
    </Tag>
  );
};

export default BilingualDisplay;
