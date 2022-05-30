import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Answer: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="answer"
    fill="curentColor"
    viewBox="0 0 18 18"
    size={[18, 18]}
  >
    <g stroke={props.stroke || '#282828'} fill="none" fillRule="nonzero">
      <path d="M13.5 16.913V12.5H16a1.5 1.5 0 0 0 1.5-1.5V2A1.5 1.5 0 0 0 16 .5H2A1.5 1.5 0 0 0 .5 2v9A1.5 1.5 0 0 0 2 12.5h6.352l5.148 4.413Z" />
    </g>
  </IconComponent>
);

export default Answer;
