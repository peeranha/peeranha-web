import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Globe: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    fill="currentColor"
    viewBox="0 0 16 16"
    size={props.size || [16, 16]}
  >
    <ellipse
      cx="8.5"
      cy="8.5"
      rx="3"
      ry="7"
      fill="none"
      stroke={props.stroke || '#282828'}
    />
    <line
      x1="1.5"
      y1="8.5"
      x2="15.5"
      y2="8.5"
      fill="none"
      stroke={props.stroke || '#282828'}
    />
    <circle
      cx="8.5"
      cy="8.5"
      r="7"
      fill="none"
      stroke={props.stroke || '#282828'}
    />
  </IconComponent>
);

export default Globe;
