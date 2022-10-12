import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const CreateCommunity: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    fill="currentColor"
    viewBox="0 0 18 18"
    size={[18, 18]}
  >
    <g
      fill={props.fill || '#282828'}
      fillOpacity=".2"
      stroke={props.stroke || '#282828'}
    >
      <circle cx="4.5" cy="4.5" r="4" transform="translate(5)" />
      <circle cx="4.5" cy="4.5" r="4" transform="translate(1 7)" />
      <circle cx="4.5" cy="4.5" r="4" transform="translate(9 7)" />
    </g>
  </IconComponent>
);

export default CreateCommunity;
