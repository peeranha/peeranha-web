import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Triangle: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="triangle"
    fill="curentColor"
    viewBox="0 0 41 22"
    size={[41, 22]}
  >
    <path
      d="M33.437,26.4a5.048,5.048,0,0,1-7.384,0L10.382,9.878c-2.031-2.141-1.3-3.892,1.633-3.892H47.477c2.928,0,3.663,1.751,1.633,3.892Z"
      transform="translate(-9.219 -6)"
    />
  </IconComponent>
);

export default Triangle;
