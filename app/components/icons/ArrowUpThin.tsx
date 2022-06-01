import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const ArrowUpThin: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="arrow-up-thin"
    fill="curentColor"
    viewBox="0 0 14 23"
    size={[14, 23]}
  >
    <g fillRule="evenodd" fill={props.fill || '#282828'}>
      <path
        d="M2333.59,6089.03l-0.71-.7,7.07-7.07,0.71,0.7Zm12.73,0-7.08-7.07,0.71-.7,7.07,7.07Zm-6.85-6.76h1v22.56h-1v-22.56Z"
        transform="translate(-2332.88 -6081.25)"
      />
    </g>
  </IconComponent>
);

export default ArrowUpThin;
