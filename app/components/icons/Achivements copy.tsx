import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Block: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="block"
    fill="curentColor"
    viewBox="0 0 16 16"
    size={[16, 16]}
  >
    <g transform="translate(0, 0)">
      <circle
        fill="#FFF"
        stroke={props.stroke || '#282828'}
        strokeWidth="1.2px"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        cx="8"
        cy="5"
        r="4.5"
        data-cap="butt"
      />
      <polyline
        fill="none"
        stroke={props.stroke || '#282828'}
        strokeWidth="1.2px"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        points="11.5,10.5 11.5,15.5 8,13.5 4.5,15.5 4.5,10.5 "
        data-cap="butt"
        data-color="color-2"
      />
    </g>
  </IconComponent>
);

export default Block;
