import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Facebook: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="facebook"
    fill="currentColor"
    viewBox="0 0 24 24"
    size={props.size || [24, 24]}
  >
    <path
      d="M24,12.072A12,12,0,1,0,10.125,23.926V15.541H7.078V12.072h3.047V9.428c0-3.007,1.792-4.669,4.532-4.669a18.611,18.611,0,0,1,2.687.234V7.947H15.83a1.734,1.734,0,0,0-1.947,1.49,1.71,1.71,0,0,0-.008.385v2.25H17.2l-.532,3.469h-2.8v8.385A12,12,0,0,0,24,12.072Z"
      fill={props.fill || '#282828'}
    />
  </IconComponent>
);

export default Facebook;
