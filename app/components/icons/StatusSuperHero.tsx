import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const StatusSuperHero: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="status-superhero"
    fill="curentColor"
    viewBox="0 0 11 9"
    size={[11, 9]}
  >
    <g stroke={props.stroke || '#282828'} fill="#FFF" fillRule="nonzero">
      <path d="M1.448 8.5h8.104l.772-6.943-2.36 2.753L5.5.86 3.036 4.31.676 1.557 1.448 8.5Z" />
    </g>
  </IconComponent>
);

export default StatusSuperHero;
