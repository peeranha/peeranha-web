import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Tip: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    fill="currentColor"
    viewBox="0 0 18 20"
    size={[18, 20]}
  >
    <g stroke={props.stroke || '#282828'} fill={props.fill || '#FFF'}>
      <ellipse cx="6" cy="14.4" rx="3.5" ry="2.167" />
      <ellipse cx="6" cy="11.2" rx="3.5" ry="2.167" />
      <ellipse cx="6" cy="8" rx="3.5" ry="2.167" />
      <ellipse cx="12" cy="14.4" rx="3.5" ry="2.167" />
      <ellipse cx="12" cy="11.2" rx="3.5" ry="2.167" />
      <ellipse cx="12" cy="8" rx="3.5" ry="2.167" />
      <ellipse cx="12" cy="4.8" rx="3.5" ry="2.167" />
    </g>
  </IconComponent>
);

export default Tip;
