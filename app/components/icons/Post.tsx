import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Post: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    fill="currentColor"
    viewBox="0 0 18 18"
    size={props.size || [18, 18]}
  >
    <g fill="none">
      <path
        d="M14.6 17H3.4C3.0287 17 2.6726 16.8468 2.41005 16.574C2.1475 16.3012 2 15.9312 2 15.5455V2.45455C2 2.06878 2.1475 1.69881 2.41005 1.42603C2.6726 1.15325 3.0287 1 3.4 1H14.6C14.9713 1 15.3274 1.15325 15.5899 1.42603C15.8525 1.69881 16 2.06878 16 2.45455V15.5455C16 15.9312 15.8525 16.3012 15.5899 16.574C15.3274 16.8468 14.9713 17 14.6 17ZM7.5 4.5H4.5V7.5H7.5V4.5Z"
        fill={props.fill || '#fff'}
        fill-opacity="0.2"
      />
      <path
        d="M10.5 4.5H13.5M10.5 7.5H13.5M4.5 10.5H13.5M4.5 13.5H13.5M14.6 17H3.4C3.0287 17 2.6726 16.8468 2.41005 16.574C2.1475 16.3012 2 15.9312 2 15.5455V2.45455C2 2.06878 2.1475 1.69881 2.41005 1.42603C2.6726 1.15325 3.0287 1 3.4 1H14.6C14.9713 1 15.3274 1.15325 15.5899 1.42603C15.8525 1.69881 16 2.06878 16 2.45455V15.5455C16 15.9312 15.8525 16.3012 15.5899 16.574C15.3274 16.8468 14.9713 17 14.6 17ZM4.5 4.5H7.5V7.5H4.5V4.5Z"
        stroke={props.stroke || '#282828'}
      />
    </g>
  </IconComponent>
);

export default Post;
