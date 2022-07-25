import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Discussions: React.FC<IconProps> = ({ className }): JSX.Element => (
  <IconComponent
    id="users"
    fill="currentColor"
    viewBox="0 0 24 24"
    size={[24, 24]}
    className={className}
  >
    <g
      transform="translate(0.5, 0.5)"
      className="opacity"
      fill="none"
      stroke="#000"
    >
      <path
        className="opacity stroke"
        d="M21,5a2,2,0,0,12,2M23,7V16a2,2,0,0,1-2,2H19v4l-6-4H12"
        fill="none"
      />
      <path
        className="stroke"
        d="M17,2H3A2,2,0,0,0,1,4v8a2,2,0,0,0,2,2H5v5l7-5h5a2,2,0,0,0,2-2V4A2,2,0,0,0,17,2Z"
      />
    </g>
  </IconComponent>
);

export default Discussions;
