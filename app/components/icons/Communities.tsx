import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Communities: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="communities"
    fill="curentColor"
    viewBox="0 0 24 24"
    size={[24, 24]}
  >
    <g
      transform="translate(3 3)"
      fillRule="nonzero"
      stroke="#282828"
      fill="none"
    >
      <circle cx="9" cy="5" r="5.5" />
      <circle cx="5" cy="12" r="5.5" />
      <circle cx="13" cy="12" r="5.5" />
    </g>
  </IconComponent>
);

export default Communities;
