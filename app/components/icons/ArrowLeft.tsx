import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const ArrowLeft: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="arrow-left"
    fill="curentColor"
    viewBox="0 0 17 12"
    size={[17, 12]}
  >
    <path
      fill="#000"
      fillRule="evenodd"
      d="M17 5H2L6.36.71 5.66 0 0 5.5l5.66 5.82.7-.71L2 6h15z"
    />
  </IconComponent>
);

export default ArrowLeft;
