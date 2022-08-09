import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Vote: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="vote"
    fill="currentColor"
    viewBox="0 0 18 18"
    size={props.size || [18, 18]}
  >
    <g fill="none">
      <circle
        stroke={props.stroke || '#282828'}
        transform="translate(2 1)"
        fill="#FFF"
        fillOpacity=".2"
        cx="7.5"
        cy="7.5"
        r="7"
      />
      <path
        d="m13.071 6.121.707.707-4.95 4.95L6 8.95l.707-.707 2.121 2.121 4.243-4.243Z"
        fill={props.fill || '#000'}
      />
    </g>
  </IconComponent>
);

export default Vote;
