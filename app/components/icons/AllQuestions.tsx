import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const AllQuestions: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="allquestions"
    fill="curentColor"
    viewBox="0 0 24 24"
    size={[24, 24]}
  >
    <g
      transform="translate(3 5)"
      fillRule="nonzero"
      stroke="#282828"
      fill="none"
    >
      <rect x=".5" y=".5" width="3" height="3" rx="1" />
      <rect x=".5" y="5.5" width="3" height="3" rx="1" />
      <rect x="5.5" y="5.5" width="12" height="3" rx="1" />
      <rect x=".5" y="10.5" width="3" height="3" rx="1" />
      <rect x="5.5" y="10.5" width="12" height="3" rx="1" />
      <rect x="5.5" y=".5" width="12" height="3" rx="1" />
    </g>
  </IconComponent>
);

export default AllQuestions;
