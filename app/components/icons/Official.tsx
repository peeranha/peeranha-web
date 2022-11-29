import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Official: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="official"
    fill="currentColor"
    viewBox="0 0 16 16"
    size={[16, 16]}
  >
    <circle
      cx="8"
      cy="5"
      r="4.5"
      fill="none"
      stroke={props.stroke || '#282828'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polyline
      points="6.88 11.512 4.799 15.5 3.575 12.605 0.5 13.257 2.813 8.824"
      fill="none"
      stroke={props.stroke || '#282828'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polyline
      points="13.187 8.824 15.5 13.257 12.425 12.605 11.201 15.5 9.12 11.512"
      fill="none"
      stroke={props.stroke || '#282828'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </IconComponent>
);

export default Official;
