import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Feed: React.FC<IconProps> = ({ size, className }): JSX.Element => (
  <IconComponent
    id="feed"
    fill="currentColor"
    viewBox="0 0 24 24"
    size={size || [24, 24]}
    className={className}
  >
    <g className="opacity" fill="#FFFFFF">
      <path
        className="stroke"
        d="M19.5 6.656L15.226 2.5H6.564c-.737 0-1.017.054-1.305.208a1.317 1.317 0 0 0-.551.551c-.154.288-.208.568-.208 1.305v14.872c0 .737.054 1.017.208 1.305.128.239.312.423.551.551.288.154.568.208 1.305.208h10.872c.737 0 1.017-.054 1.305-.208.239-.128.423-.312.551-.551.154-.288.208-.568.208-1.305V6.656z"
      />
      <path
        className="opacity stroke"
        fill="#A5BCFF"
        d="M14.5 2.5v2.936c0 .737.054 1.017.208 1.305.128.239.312.423.551.551.288.154.568.208 1.305.208H19.5v-.493L14.993 2.5H14.5z"
      />
      <path className="fill" d="M8 9h8v1H8zM8 12h8v1H8zM8 15h8v1H8z" />
    </g>
  </IconComponent>
);

export default Feed;
