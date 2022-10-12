import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Newbie: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    fill="currentColor"
    viewBox="0 0 26 16"
    size={props.size || [26, 16]}
  >
    <g stroke={props.stroke || '#282828'} fill={props.fill || '#FFF'}>
      <circle cx="8" cy="8" r="7.5" />
      <circle cx="8" cy="8" r="5.5" />
      <g transform="translate(10)">
        <circle cx="8" cy="8" r="7.5" />
        <circle cx="8" cy="8" r="5.5" />
      </g>
    </g>
  </IconComponent>
);

export default Newbie;
