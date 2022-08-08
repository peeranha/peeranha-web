import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const StrangerBig: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="stranger-big"
    fill="currentColor"
    viewBox="0 0 16 16"
    size={props.size || [16, 16]}
  >
    <g stroke={props.stroke || '#282828'} fill={props.fill || '#FFF'}>
      <circle cx="8" cy="8" r="7.5" />
      <circle cx="8" cy="8" r="5.5" />
    </g>
  </IconComponent>
);

export default StrangerBig;
