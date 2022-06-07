import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const ArrowRightThin: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="arrow-right-thin"
    fill="curentColor"
    viewBox="0 0 23 14"
    size={[23, 14]}
  >
    <path
      d="M1079.82,5299.16h0l-6.36,6.36-0.71-.7,5.84-5.84h-21.61v-1h21.67l-5.9-5.89,0.71-.71,6.36,6.37h0l0.71,0.7Z"
      transform="translate(-1056.97 -5291.38)"
    />
  </IconComponent>
);

export default ArrowRightThin;
