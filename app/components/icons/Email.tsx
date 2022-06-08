import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Email: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="email"
    fill="curentColor"
    viewBox="0 0 28 19"
    size={[28, 19]}
  >
    <g
      fill={props.fill || '#FFF'}
      stroke="none"
      strokeWidth="1"
      fillRule="evenodd"
      transform="translate(-1236.000000, -225.000000)"
    >
      <g transform="translate(1236.000000, 225.000000)">
        <rect
          stroke={props.stroke || '#282828'}
          x="0.5"
          y="0.5"
          width="27"
          height="18"
          rx="2"
        />
        <path
          d="M0.5,1.78849633 L14.0003678,10.4070347 L27.5,1.81252242 L27.5,0.5 L0.5,0.5 L0.5,1.78849633 Z"
          stroke={props.stroke || '#282828'}
          fill={props.fill || '#FFF'}
        />
      </g>
    </g>
  </IconComponent>
);

export default Email;
