import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const CloseRounded: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="close-rounded"
    fill="curentColor"
    viewBox="0 0 15 15"
    size={[15, 15]}
  >
    <g fillRule="nonzero" fill="none">
      <circle
        cx="7.5"
        cy="7.5"
        r="7"
        fill="#FFF"
        fillOpacity=".2"
        stroke={props.stroke || '#282828'}
      />
      <g fill="#000">
        <path d="m10.328 3.964.708.708-6.364 6.364-.708-.708z" />
        <path d="m11.036 10.328-.708.708-6.364-6.364.708-.708z" />
      </g>
    </g>
  </IconComponent>
);

export default CloseRounded;
