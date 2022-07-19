import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Hero: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="hero"
    fill="curentColor"
    viewBox="0 0 33 9"
    size={[33, 9]}
  >
    <g stroke={props.stroke || '#282828'} fill="#FFF">
      <circle cx="4.5" cy="4.5" r="4" />
      <circle cx="4.5" cy="4.5" r="4" transform="translate(6)" />
      <circle cx="4.5" cy="4.5" r="4" transform="translate(12)" />
      <circle cx="4.5" cy="4.5" r="4" transform="translate(18)" />
      <circle cx="4.5" cy="4.5" r="4" transform="translate(24)" />
    </g>
  </IconComponent>
);

export default Hero;
