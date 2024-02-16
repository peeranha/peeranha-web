import React from 'react';
import IconComponent, { IconProps } from '../IconComponent';

const PostCommentedGraph: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent {...props} fill="none" viewBox="0 0 32 32" size={props.size || [32, 32]}>
    <path
      d="M22.0013 25.3333H14.668V20H24.0013V14.6667H29.3346V25.3333H26.0013L24.0013 27.3333L22.0013 25.3333Z"
      stroke={props.stroke || '#E1E1E4'}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.66797 4H24.0013V20H11.3346L8.66797 22.6667L6.0013 20H2.66797V4Z"
      stroke={props.stroke || '#E1E1E4'}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.42188 13.0666H17.4219"
      stroke={props.stroke || '#E1E1E4'}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M9.42188 9.33334H17.4219"
      stroke={props.stroke || '#E1E1E4'}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </IconComponent>
);

export default PostCommentedGraph;
