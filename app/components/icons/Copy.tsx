import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Copy: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="copy"
    fill="curentColor"
    viewBox="0 0 32 32"
    size={[32, 32]}
  >
    <g strokeWidth="2" transform="translate(0.5, 0.5)">
      <g strokeWidth="2">
        <path
          d="M25,4h1a2,2,0,0,1,2,2V28a2,2,0,0,1-2,2H6a2,2,0,0,1-2-2V6A2,2,0,0,1,6,4H7"
          fill="none"
          stroke={props.stroke || '#282828'}
          strokeLinecap="square"
          strokeMiterlimit="10"
          strokeWidth="2"
          strokeLinejoin="miter"
        />
        <rect
          fill="none"
          height="4"
          stroke={props.stroke || '#282828'}
          strokeLinecap="square"
          strokeMiterlimit="10"
          strokeWidth="2"
          width="10"
          x="11"
          y="2"
          strokeLinejoin="miter"
        />
        <polyline
          fill="none"
          points="10 19 13 22 22 13"
          stroke={props.stroke || '#282828'}
          strokeLinecap="square"
          strokeMiterlimit="10"
          strokeWidth="2"
          strokeLinejoin="miter"
        />
      </g>
    </g>
  </IconComponent>
);

export default Copy;
