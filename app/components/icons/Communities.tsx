import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Communities: React.FC<IconProps> = ({
  stroke,
  className,
}): JSX.Element => (
  <IconComponent
    id="communities"
    fill="currentColor"
    viewBox="0 0 24 24"
    size={[24, 24]}
    className={className}
  >
    <g
      transform="translate(3 3)"
      stroke={stroke || '#282828'}
      fill="none"
      className="stroke"
    >
      <circle cx="9" cy="5" r="5.5" />
      <circle cx="5" cy="12" r="5.5" />
      <circle cx="13" cy="12" r="5.5" />
    </g>
  </IconComponent>
);

export default Communities;
