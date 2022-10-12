import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const ChangeType: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    fill="currentColor"
    viewBox="0 0 64 64"
    size={props.size || [24, 24]}
  >
    <g strokeWidth="2">
      <polygon
        points="55.8 55.8 46 57.2 47.4 47.4 55.8 55.8"
        stroke={props.stroke || '#282828'}
        strokeWidth="5"
      />
      <polygon
        points="16.6 16.6 18 6.8 8.2 8.2 16.6 16.6"
        stroke={props.stroke || '#282828'}
        strokeWidth="5"
      />
      <path
        d="M51.8,51.8A28,28,0,0,0,32,4"
        fill="none"
        stroke={props.stroke || '#282828'}
        strokeWidth="5"
      />
      <path
        d="M12.2,12.2A28,28,0,0,0,32,60"
        fill="none"
        stroke={props.stroke || '#282828'}
        strokeWidth="5"
      />
    </g>
  </IconComponent>
);

export default ChangeType;
