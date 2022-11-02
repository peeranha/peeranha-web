import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Junior: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="junior"
    fill="curentColor"
    viewBox="0 0 15 9"
    size={[15, 9]}
  >
    <g stroke={props.stroke || '#282828'} fill="#FFF">
      <circle cx="4.5" cy="4.5" r="4" />
      <circle cx="4.5" cy="4.5" r="4" transform="translate(6)" />
    </g>
  </IconComponent>
);

export default Junior;
