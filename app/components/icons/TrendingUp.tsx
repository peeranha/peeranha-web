import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const TrendingUp: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent {...props} id="tutorial" fill="currentColor" viewBox="0 0 24 24" size={[24, 24]}>
    <g fill="none">
      <path
        d="M23 6L13.5 15.5L8.5 10.5L1 18"
        stroke={props.stroke || 'rgba(40, 40, 40, 1)'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 6H23V12"
        stroke={props.stroke || 'rgba(40, 40, 40, 1)'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </IconComponent>
);

export default TrendingUp;
