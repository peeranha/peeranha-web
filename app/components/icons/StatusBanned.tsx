import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const StatusBanned: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="status-banned"
    fill="curentColor"
    viewBox="0 0 9 9"
    size={[9, 9]}
  >
    <g stroke={props.stroke || '#282828'} fill="none">
      <circle cx="4.5" cy="4.5" r="4" />
      <path d="m1.672 6.621 4.95-4.95.706.708-4.95 4.95z" />
    </g>
  </IconComponent>
);

export default StatusBanned;
