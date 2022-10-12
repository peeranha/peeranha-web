import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const ArrowDownFill: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    fill="currentColor"
    viewBox="0 0 24 24"
    size={props.size || [24, 24]}
  >
    <g fill="none">
      <path
        d="M19.1421 9.41421L17.7279 8L12.0711 13.6569L6.41421 8L5 9.41421L12.0711 16.4853L19.1421 9.41421Z"
        fill={props.fill || 'currentColor'}
      />
    </g>
  </IconComponent>
);

export default ArrowDownFill;
