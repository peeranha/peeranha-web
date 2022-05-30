import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const StatusSenior: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="status-senior"
    fill="curentColor"
    viewBox="0 0 27 9"
    size={[27, 9]}
  >
    <g stroke={props.stroke || '#282828'} fill="#FFF" fillRule="nonzero">
      <circle cx="4.5" cy="4.5" r="4" />
      <circle cx="4.5" cy="4.5" r="4" transform="translate(6)" />
      <circle cx="4.5" cy="4.5" r="4" transform="translate(12)" />
      <circle cx="4.5" cy="4.5" r="4" transform="translate(18)" />
    </g>
  </IconComponent>
);

export default StatusSenior;
