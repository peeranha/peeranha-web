import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Checked: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    fill="currentColor"
    viewBox="0 0 18 18"
    size={props.size || [18, 18]}
  >
    <g fill="none">
      <path d="M16 4L6 14L2 10" stroke={props.stroke || '#282828'} />
    </g>
  </IconComponent>
);

export default Checked;
