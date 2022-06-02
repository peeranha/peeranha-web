import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Minus: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="minus"
    fill="curentColor"
    viewBox="0 0 29 29"
    size={[29, 29]}
  >
    <g fill={props.fill || '#282828'} fillRule="evenodd">
      <path
        d="M1905.99,201.516a14.5,14.5,0,1,1-14.5-14.5A14.5,14.5,0,0,1,1905.99,201.516ZM1891.47,188a13.515,13.515,0,1,0,13.52,13.515A13.513,13.513,0,0,0,1891.47,188Zm6.52,14.015h-13v-1h13v1Z"
        transform="translate(-1877 -187.031)"
      />
    </g>
  </IconComponent>
);

export default Minus;
