import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Hero: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    fill="currentColor"
    viewBox="0 0 33 9"
    size={[33, 9]}
  >
    <g>
      <circle
        cx="4.5"
        cy="4.5"
        r="4"
        fill={props.fill || '#FFF'}
        stroke={props.stroke || '#282828'}
      />
      <circle
        cx="10.5"
        cy="4.5"
        r="4"
        fill={props.fill || '#FFF'}
        stroke={props.stroke || '#282828'}
      />
      <circle
        cx="16.5"
        cy="4.5"
        r="4"
        fill={props.fill || '#FFF'}
        stroke={props.stroke || '#282828'}
      />
      <circle
        cx="22.5"
        cy="4.5"
        r="4"
        fill={props.fill || '#FFF'}
        stroke={props.stroke || '#282828'}
      />
      <circle
        cx="28.5"
        cy="4.5"
        r="4"
        fill={props.fill || '#FFF'}
        stroke={props.stroke || '#282828'}
      />
    </g>
  </IconComponent>
);

export default Hero;
