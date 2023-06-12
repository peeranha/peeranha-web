import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const ChangeType: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="change-type"
    fill="currentColor"
    viewBox="0 0 64 64"
    size={[64, 64]}
  >
    <g strokeWidth="2">
      <polygon
        points="55.8 55.8 46 57.2 47.4 47.4 55.8 55.8"
        stroke={props.stroke || '#282828'}
        strokeWidth="5"
        strokeLinejoin="miter"
      />
      <polygon
        points="16.6 16.6 18 6.8 8.2 8.2 16.6 16.6"
        stroke={props.stroke || '#282828'}
        strokeWidth="5"
        strokeLinejoin="miter"
      />
      <path
        d="M51.8,51.8A28,28,0,0,0,32,4"
        fill="none"
        stroke={props.stroke || '#282828'}
        strokeWidth="5"
        strokeLinecap="butt"
        strokeLinejoin="miter"
      />
      <path
        d="M12.2,12.2A28,28,0,0,0,32,60"
        fill="none"
        stroke={props.stroke || '#282828'}
        strokeWidth="5"
        strokeLinecap="butt"
        strokeLinejoin="miter"
      />
    </g>
  </IconComponent>
);

export default ChangeType;
