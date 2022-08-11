import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const BestAnswer: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="best-answer"
    fill="curentColor"
    viewBox="0 0 19 20"
    size={[19, 20]}
  >
    <g stroke={props.stroke || '#282828'} fill="none">
      <path
        d="M4.652 5.913a.401.401 0 0 0-.54.02c-.15.15-.15.389.046.587l3.847 4.365a.401.401 0 0 0 .563 0l9.32-9.232a.377.377 0 0 0 0-.538.401.401 0 0 0-.564 0l-9.103 9.016-3.569-4.218Z"
        strokeWidth="2"
      />
      <path d="M11.797 2.5H2A1.5 1.5 0 0 0 .5 4v9A1.5 1.5 0 0 0 2 14.5h6.181l5.319 4.432V14.5H16a1.5 1.5 0 0 0 1.5-1.5V6.269L11.797 2.5Z" />
    </g>
  </IconComponent>
);

export default BestAnswer;
