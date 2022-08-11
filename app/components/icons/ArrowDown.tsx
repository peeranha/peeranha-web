import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const ArrowDown: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="arrow-down"
    fill="curentColor"
    viewBox="0 0 14 9"
    size={[14, 9]}
  >
    <g stroke={props.stroke || '#282828'} fill="none">
      <path d="M7 6.243 12.657.586 14.07 2 8.414 7.657 7 9.07-.071 2 1.343.586 7 6.243Z" />
    </g>
  </IconComponent>
);

export default ArrowDown;
