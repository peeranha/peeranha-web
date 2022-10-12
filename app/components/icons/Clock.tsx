import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Clock: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    fill="currentColor"
    viewBox="0 0 18 18"
    size={[18, 18]}
  >
    <g>
      <circle
        cx="9"
        cy="9"
        r="7.5"
        fill={props.fill || '#282828'}
        fillOpacity="0.2"
        stroke={props.stroke || '#282828'}
      />
    </g>
    <rect x="8" y="5" width="1" height="5" fill={props.fill || '#282828'} />
    <rect
      x="12"
      y="9"
      width="1"
      height="3"
      transform="rotate(90 12 9)"
      fill={props.fill || '#282828'}
    />
  </IconComponent>
);

export default Clock;
