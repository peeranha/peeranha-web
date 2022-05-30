import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Energy: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="energy"
    fill="curentColor"
    viewBox="0 0 13 19"
    size={[13, 19]}
  >
    <g stroke={props.stroke || '#282828'} fill="none">
      <path d="M9.016 1.826 1.13 10.5h4.566l-1.712 6.674L11.87 8.5H7.304l1.712-6.674Z" />
    </g>
  </IconComponent>
);

export default Energy;
