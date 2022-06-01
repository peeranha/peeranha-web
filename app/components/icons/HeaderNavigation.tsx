import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const HeaderNavigation: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="header-navigation"
    fill="curentColor"
    viewBox="0 0 22 17"
    size={[22, 17]}
  >
    <g fillRule="evenodd">
      <path d="M0 7h22v3H0zM0 0h22v3H0zM0 14h22v3H0z" />
    </g>
  </IconComponent>
);

export default HeaderNavigation;
