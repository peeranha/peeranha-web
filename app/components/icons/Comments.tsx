import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Comments: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="comments"
    fill="curentColor"
    viewBox="0 0 24 24"
    size={[24, 24]}
  >
    <g transform="translate(0.5, 0.5)">
      <path
        fill="none"
        stroke="#000000"
        strokeWidth="1"
        d="M7.799,16.601
	      C9.092,18.61,11.826,20,15,20c0.59,0,1.163-0.051,1.716-0.142L21,22v-4.04c1.241-1.057,2-2.44,2-3.96
	      c0-1.552-0.792-2.961-2.081-4.027"
        strokeLinejoin="miter"
        strokeLinecap="butt"
      />
      <path
        fill="none"
        stroke="#000000"
        strokeWidth="1"
        strokeLinecap="square"
        d="M11,1C5.477,1,1,4.582,1,9
	      c0,1.797,0.75,3.45,2,4.785V19l4.833-2.416C8.829,16.85,9.892,17,11,17c5.523,0,10-3.582,10-8S16.523,1,11,1z"
        strokeLinejoin="miter"
      />
    </g>
  </IconComponent>
);

export default Comments;
