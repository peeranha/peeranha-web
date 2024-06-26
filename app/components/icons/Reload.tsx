import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Reload: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="reload"
    fill="currentColor"
    viewBox="0 0 20 20"
    size={props.size || [20, 20]}
  >
    <path
      d="M17.318 9.839c0 4.125-3.364 7.48-7.5 7.48a7.508 7.508 0 0 1-5.781-2.72h3.372v-.68H3v4.4h.682v-3.082A8.193 8.193 0 0 0 9.818 18C14.33 18 18 14.339 18 9.839h-.682zM12.59 6.08H17v-4.4h-.682v3.083A8.191 8.191 0 0 0 10.182 2C5.67 2 2 5.661 2 10.161h.682c0-4.125 3.364-7.48 7.5-7.48a7.505 7.505 0 0 1 5.781 2.72h-3.372v.68z"
      strokeWidth=".5"
    />
  </IconComponent>
);

export default Reload;
