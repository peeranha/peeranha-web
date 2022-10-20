import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Profile: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="profile"
    fill="curentColor"
    viewBox="0 0 24 24"
    size={props.size}
  >
    <g fill="none">
      <circle
        cx="12"
        cy="7"
        r="5"
        fill="white"
        stroke={props.stroke || '#282828'}
      />
      <ellipse
        cx="12"
        cy="17"
        rx="8"
        ry="5"
        fill={props.fill || '#fff'}
        stroke={props.stroke || '#282828'}
      />
    </g>
  </IconComponent>
);

export default Profile;
