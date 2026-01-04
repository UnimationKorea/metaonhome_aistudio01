
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
  const Tag = Component as any;
  return (
    <Tag className={`flex flex-col gap-3 ${className}`}>
      <span className={`${enClassName} leading-[1.2] break-keep block`}>{text.en}</span>
      <span className={`${krClassName} text-[0.8em] md:text-[0.85em] leading-[1.6] break-keep tracking-tight block opacity-80 font-medium`}>{text.kr}</span>
    </Tag>
  );
};

export default BilingualDisplay;
