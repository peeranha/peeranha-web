import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Stranger: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    fill="currentColor"
    viewBox="0 0 9 9"
    size={props.size || [9, 9]}
  >
    <circle
      stroke={props.stroke || '#282828'}
      fill={props.fill || 'none'}
      cx="4.5"
      cy="9.5"
      r="4"
      transform="translate(0 -5)"
    />
  </IconComponent>
);

export default Stranger;
