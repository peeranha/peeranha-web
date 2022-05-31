import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const StatusRedident: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="status-redident"
    fill="curentColor"
    viewBox="0 0 21 9"
    size={[21, 9]}
  >
    <g stroke={props.stroke || '#282828'} fillRule="nonzero" fill="#FFF">
      <circle cx="4.5" cy="4.5" r="4" />
      <circle cx="4.5" cy="4.5" r="4" transform="translate(6)" />
      <circle cx="4.5" cy="4.5" r="4" transform="translate(12)" />
    </g>
  </IconComponent>
);

export default StatusRedident;
