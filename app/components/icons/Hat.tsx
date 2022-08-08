import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Hat: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="hat"
    fill="currentColor"
    viewBox="0 0 24 24"
    size={[24, 24]}
    className={props.className}
  >
    <g strokeWidth="1" transform="translate(0.5, 0.5)" fill="none">
      <line
        className="stroke"
        stroke={props.stroke || '#282828'}
        x1="23"
        y1="10"
        x2="23"
        y2="18"
      />
      <path
        stroke={props.stroke || '#282828'}
        d="M5,9.5V18c0,1.657,3.134,3,7,3
	        s7-1.343,7-3V9.5"
        className="stroke"
      />
      <polygon
        stroke={props.stroke || '#282828'}
        points="12,13 2,8 12,3 22,8"
        className="stroke"
      />
    </g>
  </IconComponent>
);

export default Hat;
