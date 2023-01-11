import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const ArrowDown: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="arrow-down"
    fill="curentColor"
    viewBox="0 0 24 24"
    size={[24, 24]}
  >
    <path d="M19.1421 9.41421L17.7279 8L12.0711 13.6569L6.41421 8L5 9.41421L12.0711 16.4853L19.1421 9.41421Z" />
  </IconComponent>
);

export default ArrowDown;
