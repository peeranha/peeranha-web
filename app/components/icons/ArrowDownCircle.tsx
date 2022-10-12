import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const ArrowDownCircle: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    fill="currentColor"
    viewBox="0 0 64 64"
    size={props.size || [64, 64]}
  >
    <circle
      fill="none"
      stroke={props.stroke || '#282828'}
      strokeWidth="3"
      cx="32"
      cy="32"
      r="30"
    />
    <polyline
      fill="none"
      stroke={props.stroke || '#282828'}
      strokeWidth="3"
      points="44,28 32,40 20,28 "
    />
  </IconComponent>
);

export default ArrowDownCircle;
