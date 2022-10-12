import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Communities: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    fill="currentColor"
    viewBox="0 0 24 24"
    size={props.size || [24, 24]}
  >
    <g stroke={props.stroke || '#282828'} fill="none" className="stroke">
      <circle cx="12" cy="8" r="5.5" />
      <circle cx="8" cy="15" r="5.5" />
      <circle cx="16" cy="15" r="5.5" />
    </g>
  </IconComponent>
);

export default Communities;
