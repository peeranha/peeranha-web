import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Delete: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="delete"
    fill="currentColor"
    viewBox="0 0 18 18"
    size={[18, 18]}
  >
    <g transform="translate(1)" stroke={props.stroke || '#282828'} fill="none">
      <rect x="6" y="8" width="1" height="6" rx=".5" />
      <rect x="9" y="8" width="1" height="6" rx=".5" />
      <path
        d="M2.5 4.5V15A2.5 2.5 0 0 0 5 17.5h6a2.5 2.5 0 0 0 2.5-2.5V4.5h-11Z"
        fillOpacity=".2"
        opacity=".9"
        fill={props.stroke || '#282828'}
      />
      <rect y="4" width="16" height="1" rx=".5" />
      <path d="M4.5 4.5h7V2A1.5 1.5 0 0 0 10 .5H6A1.5 1.5 0 0 0 4.5 2v2.5Z" />
    </g>
  </IconComponent>
);

export default Delete;
