import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Blockchain: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    fill="currentColor"
    viewBox="0 0 32 32"
    size={props.size || [32, 32]}
  >
    <g strokeWidth="1" transform="translate(0.5, 0.5)">
      <polyline
        points="2 6.5 9 10 16 6.5"
        fill="none"
        stroke={props.stroke || '#282828'}
        strokeWidth="1"
      />

      <line
        x1="9"
        y1="10"
        x2="9"
        y2="18.5"
        fill="none"
        stroke={props.stroke || '#282828'}
        strokeWidth="1"
      />

      <polygon
        points="16 6.5 9 2.999 2 6.5 2 15 9 18.5 16 15 16 6.5"
        fill="none"
        stroke={props.stroke || '#282828'}
        strokeWidth="1"
      />

      <polyline
        points="16 6.5 23 10 30 6.5"
        fill="none"
        stroke={props.stroke || '#282828'}
        strokeWidth="1"
      />

      <line
        x1="23"
        y1="10"
        x2="23"
        y2="18.5"
        fill="none"
        stroke={props.stroke || '#282828'}
        strokeWidth="1"
      />

      <polygon
        points="30 6.5 23 2.999 16 6.5 16 15 23 18.5 30 15 30 6.5"
        fill="none"
        stroke={props.stroke || '#282828'}
        strokeWidth="1"
      />

      <polyline
        points="9 18.5 16 22 23 18.5"
        fill="none"
        stroke={props.stroke || '#282828'}
        strokeWidth="1"
      />

      <line
        x1="16"
        y1="22"
        x2="16"
        y2="30.5"
        fill="none"
        stroke={props.stroke || '#282828'}
        strokeWidth="1"
      />

      <polygon
        points="23 18.5 16 14.999 9 18.5 9 27 16 30.5 23 27 23 18.5"
        fill="none"
        stroke={props.stroke || '#282828'}
        strokeWidth="1"
      />
    </g>
  </IconComponent>
);

export default Blockchain;
