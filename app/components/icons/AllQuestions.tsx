import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const AllQuestions: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    fill="currentColor"
    viewBox="0 0 24 24"
    size={[24, 24]}
  >
    <g fill="none">
      <rect x="3.5" y="5.5" width="3" height="3" rx="0.5" stroke="#282828" />
      <rect x="3.5" y="10.5" width="3" height="3" rx="0.5" stroke="#282828" />
      <rect x="8.5" y="10.5" width="12" height="3" rx="0.5" stroke="#282828" />
      <rect x="3.5" y="15.5" width="3" height="3" rx="0.5" stroke="#282828" />
      <rect x="8.5" y="15.5" width="12" height="3" rx="0.5" stroke="#282828" />
      <rect x="8.5" y="5.5" width="12" height="3" rx="0.5" stroke="#282828" />
    </g>
  </IconComponent>
);

export default AllQuestions;
