import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const AnswerWithA: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="answer-with-a"
    fill="curentColor"
    viewBox="0 0 18 18"
    size={[18, 18]}
  >
    <g fill="none">
      <path
        fill={props.stroke || '#282828'}
        d="M7.859 7.063h2.167l-.341-1.1a70.367 70.367 0 0 1-.715-2.431h-.044a70.367 70.367 0 0 1-.715 2.431l-.352 1.1ZM10.95 10l-.693-2.2H7.628L6.935 10H6l2.442-7.216h1.034L11.918 10h-.968Z"
      />
      <path
        stroke={props.stroke || '#282828'}
        d="M13.5 16.913V12.5H16a1.5 1.5 0 0 0 1.5-1.5V2A1.5 1.5 0 0 0 16 .5H2A1.5 1.5 0 0 0 .5 2v9A1.5 1.5 0 0 0 2 12.5h6.352l5.148 4.413Z"
      />
    </g>
  </IconComponent>
);

export default AnswerWithA;
