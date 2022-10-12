import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Burger: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    fill="currentColor"
    viewBox="0 0 22 17"
    size={[20, 17]}
  >
    <path
      fill={props.fill || 'currentColor'}
      d="M0 7h22v3H0zM0 0h22v3H0zM0 14h22v3H0z"
    />
  </IconComponent>
);

export default Burger;
