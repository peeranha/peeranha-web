import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Plus: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent {...props} id="plus" fill="curentColor" viewBox="0 0 14 14">
    <path d="M8 0v14H6V0z" />
    <path d="M0 6h14v2H0z" />
  </IconComponent>
);

export default Plus;
