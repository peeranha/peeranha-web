import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const EyeOpened: React.FC<IconProps> = ({ fill, size }): JSX.Element => (
  <IconComponent
    id="eye-opened"
    fill="currentColor"
    viewBox="0 0 22 14"
    size={size || [22, 14]}
  >
    <g fill="none">
      <path
        fill={fill || '#000'}
        d="M20 7c0-2.761-4.03-5-9-5S2 4.239 2 7s4.03 5 9 5 9-2.239 9-5zm2 0c0 3.866-4.925 7-11 7S0 10.866 0 7s4.925-7 11-7 11 3.134 11 7z"
      />
      <circle fill={fill || '#000'} cx="11" cy="7" r="3.5" />
      <circle fill="#FFF" cx="11" cy="7" r="2" />
    </g>
  </IconComponent>
);

export default EyeOpened;
