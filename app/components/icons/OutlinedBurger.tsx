import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const OutlinedBurger: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent {...props} id="tutorial" fill="currentColor" viewBox="0 0 24 24" size={[24, 24]}>
    <g fill="none">
      <path
        d="M21 2.5H3V6.5H21V2.5Z"
        stroke={props.stroke || 'rgba(40, 40, 40, 1)'}
        strokeLinejoin="round"
      />
      <path
        d="M21 10H3V14H21V10Z"
        stroke={props.stroke || 'rgba(40, 40, 40, 1)'}
        strokeLinejoin="round"
      />
      <path
        d="M21 17.5H3V21.5H21V17.5Z"
        stroke={props.stroke || 'rgba(40, 40, 40, 1)'}
        strokeLinejoin="round"
      />
    </g>
  </IconComponent>
);

export default OutlinedBurger;
