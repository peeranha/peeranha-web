import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Copy: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    fill="currentColor"
    viewBox="0 0 32 32"
    size={[32, 32]}
  >
    <g
      strokeWidth="2"
      stroke={props.stroke || '#282828'}
      transform="translate(0.5, 0.5)"
      strokeLinecap="square"
      strokeLinejoin="miter"
      fill="none"
    >
      <path d="M25,4h1a2,2,0,0,1,2,2V28a2,2,0,0,1-2,2H6a2,2,0,0,1-2-2V6A2,2,0,0,1,6,4H7" />
      <rect height="4" width="10" x="11" y="2" />
      <polyline points="10 19 13 22 22 13" />
    </g>
  </IconComponent>
);

export default Copy;
