import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const UserNoPhoto: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="user-no-photo"
    fill="curentColor"
    viewBox="0 0 21 21"
    size={[21, 21]}
  >
    <g transform="translate(1)" stroke="#BDBDBD" fill="none">
      <circle cx="9.5" cy="5.5" r="5" />
      <path d="M18.5 16.897c0-3.703-3.837-6.397-9-6.397s-9 2.694-9 6.397c0 1.455 3.955 2.603 9 2.603s9-1.148 9-2.603Z" />
    </g>
  </IconComponent>
);

export default UserNoPhoto;
