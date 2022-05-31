import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const JuniorBig: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="junior-big"
    fill="curentColor"
    viewBox="0 0 36 16"
    size={[36, 16]}
  >
    <g stroke={props.stroke || '#282828'} fill="#FFF" fillRule="nonzero">
      <circle cx="8" cy="8" r="7.5" />
      <circle cx="8" cy="8" r="5.5" />
      <g transform="translate(10)">
        <circle cx="8" cy="8" r="7.5" />
        <circle cx="8" cy="8" r="5.5" />
      </g>
      <g transform="translate(20)">
        <circle cx="8" cy="8" r="7.5" />
        <circle cx="8" cy="8" r="5.5" />
      </g>
    </g>
  </IconComponent>
);

export default JuniorBig;
