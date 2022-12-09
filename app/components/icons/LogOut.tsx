import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const LogOut: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    fill="currentColor"
    viewBox="0 0 18 18"
    size={props.size || [18, 18]}
  >
    <g stroke={props.stroke || '#282828'} fill="none">
      <path d="m3.815 1.5 6.092 12H13.5v-12H3.815Z" />
      <path
        d="M3.5 1.769V13.67l6 2.572V4.429l-6-2.66Z"
        fillOpacity=".2"
        fill="#FFF"
      />
    </g>
  </IconComponent>
);

export default LogOut;
