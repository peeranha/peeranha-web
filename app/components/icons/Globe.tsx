import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Globe: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="globe"
    fill="curentColor"
    viewBox="0 0 16 16"
    size={[16, 16]}
  >
    <g>
      <ellipse
        cx="8.5"
        cy="8.5"
        rx="3"
        ry="7"
        fill="none"
        stroke={props.stroke || '#282828'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="1.5"
        y1="8.5"
        x2="15.5"
        y2="8.5"
        fill="none"
        stroke={props.stroke || '#282828'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="8.5"
        cy="8.5"
        r="7"
        fill="none"
        stroke={props.stroke || '#282828'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </IconComponent>
);

export default Globe;
