import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Feedback: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    fill="currentColor"
    viewBox="0 0 24 24"
    size={[24, 24]}
  >
    <g strokeWidth="2" fill="#ffffff" stroke="#fc6655" strokeMiterlimit="10">
      <path d="M20.4,16.8A8.215,8.215,0,0,0,23,11c0-5-4.9-9-11-9S1,6,1,11s4.9,9,11,9a10.55,10.55,0,0,0,3.1-.4L21,22Z" />
      <line x1="12" y1="6" x2="12" y2="12" stroke="#fc6655" />
      <circle cx="12" cy="16" r="1" stroke="none" fill="#fc6655" />
    </g>
  </IconComponent>
);

export default Feedback;
