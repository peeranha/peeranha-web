import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Users: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="users"
    fill="currentColor"
    viewBox="0 0 24 24"
    size={[24, 24]}
  >
    <g
      transform="translate(1 2)"
      stroke="#282828"
      fill="none"
      className="stroke"
    >
      <circle cx="6" cy="7" r="3.5" />
      <circle cx="16" cy="4" r="3.5" />
      <path d="M11.5 16a5.5 5.5 0 0 0-11 0c0 2.647 11 2.647 11 0Z" />
      <path d="M11.177 13.972c.093.061.196.12.307.178 3.08 1.588 10.016.788 10.016-1.15a5.5 5.5 0 0 0-10.983-.438c.276.441.498.914.66 1.41Z" />
    </g>
  </IconComponent>
);

export default Users;
