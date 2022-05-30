import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Block: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="block"
    fill="curentColor"
    viewBox="0 0 18 18"
    size={[18, 18]}
  >
    <g stroke={props.stroke || '#282828'} fill="none">
      <circle
        cx="7.5"
        cy="7.5"
        r="7"
        fillOpacity=".2"
        transform="translate(2 1)"
      />
      <path d="m13.743 3.55.707.707-9.193 9.193-.707-.707z" />
    </g>
  </IconComponent>
);

export default Block;
