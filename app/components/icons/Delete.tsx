import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Delete: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="delete"
    fill="currentColor"
    viewBox="0 0 18 18"
    size={[18, 18]}
  >
    <rect x="7" y="8.5" width="1" height="6" rx="0.5" fill="#576FED" />
    <rect x="10" y="8.5" width="1" height="6" rx="0.5" fill="#576FED" />
    <path
      opacity="0.9"
      d="M3.5 5H14.5V15.5C14.5 16.8807 13.3807 18 12 18H6C4.61929 18 3.5 16.8807 3.5 15.5V5Z"
      fill="#7699FF"
      fillOpacity="0.2"
      stroke="#576FED"
    />
    <rect x="1" y="4.5" width="16" height="1" rx="0.5" fill="#576FED" />
    <path
      d="M5.5 2.5C5.5 1.67157 6.17157 1 7 1H11C11.8284 1 12.5 1.67157 12.5 2.5V5H5.5V2.5Z"
      stroke="#576FED"
      fill="transparent"
    />
  </IconComponent>
);

export default Delete;
