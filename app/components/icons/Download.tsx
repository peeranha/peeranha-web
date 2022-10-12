import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Download: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    fill="currentColor"
    viewBox="0 0 18 18"
    size={[18, 18]}
  >
    <g stroke={props.stroke || '#282828'}>
      <rect width="16" height="1" x=".5" y="17.5" rx=".5" />
      <rect width="1" height="3" x=".5" y="14.5" rx=".5" />
      <rect width="1" height="3" x="16.5" y="14.5" rx=".5" />
      <path
        fill={props.fill || '#282828'}
        fillOpacity=".2"
        d="M10.157.5h-3v8H4.159l4.498 4.771L13.155 8.5h-2.998v-8z"
      />
    </g>
  </IconComponent>
);

export default Download;
