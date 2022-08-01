import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const PlusCircle: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="minus"
    fill="currentColor"
    viewBox="0 0 29 29"
    size={[29, 29]}
  >
    <g fill={props.fill || '#282828'}>
      <path
        d="M1905.99,201.516a14.5,14.5,0,1,1-14.5-14.5A14.5,14.5,0,0,1,1905.99,201.516ZM1891.47,188a13.515,13.515,0,1,0,13.52,13.515A13.513,13.513,0,0,0,1891.47,188Zm6.52,14.015h-6v6h-1v-6h-6v-1h6v-6h1v6h6v1Z"
        transform="translate(-1877 -187.031)"
      />
    </g>
  </IconComponent>
);

export default PlusCircle;
