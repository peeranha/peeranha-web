import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const CloseRounded: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    fill="currentColor"
    viewBox="0 0 18 18"
    size={props.size || [18, 18]}
  >
    <circle
      cx="9"
      cy="9"
      r="7.5"
      fill={props.fill || '#282828'}
      fillOpacity="0.2"
      stroke={props.fill || '#282828'}
    />
    <rect
      x="12.017"
      y="5.22879"
      width="1.06667"
      height="9.6"
      transform="rotate(45 12.017 5.22879)"
      fill={props.fill || '#282828'}
    />
    <rect
      x="12.7712"
      y="12.017"
      width="1.06667"
      height="9.6"
      transform="rotate(135 12.7712 12.017)"
      fill={props.fill || '#282828'}
    />
  </IconComponent>
);

export default CloseRounded;
