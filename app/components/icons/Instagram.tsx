import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Instagram: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="instagram"
    fill="curentColor"
    viewBox="0 0 24 24"
    size={[24, 24]}
  >
    <path
      fill={props.fill || '#282828'}
      d="M12,2.162c3.204,0,3.584,0.012,4.849,0.07c1.366,0.062,2.633,0.336,3.608,1.311
	c0.975,0.975,1.249,2.242,1.311,3.608c0.058,1.265,0.07,1.645,0.07,4.849s-0.012,3.584-0.07,4.849
	c-0.062,1.366-0.336,2.633-1.311,3.608c-0.975,0.975-2.242,1.249-3.608,1.311c-1.265,0.058-1.645,0.07-4.849,0.07
	s-3.584-0.012-4.849-0.07c-1.366-0.062-2.633-0.336-3.608-1.311c-0.975-0.975-1.249-2.242-1.311-3.608
	c-0.058-1.265-0.07-1.645-0.07-4.849s0.012-3.584,0.07-4.849c0.062-1.366,0.336-2.633,1.311-3.608
	c0.975-0.975,2.242-1.249,3.608-1.311C8.416,2.174,8.796,2.162,12,2.162 M12,0C8.741,0,8.332,0.014,7.052,0.072
	c-1.95,0.089-3.663,0.567-5.038,1.942C0.639,3.389,0.161,5.102,0.072,7.052C0.014,8.332,0,8.741,0,12
	c0,3.259,0.014,3.668,0.072,4.948c0.089,1.95,0.567,3.663,1.942,5.038c1.375,1.375,3.088,1.853,5.038,1.942
	C8.332,23.986,8.741,24,12,24s3.668-0.014,4.948-0.072c1.95-0.089,3.663-0.567,5.038-1.942c1.375-1.375,1.853-3.088,1.942-5.038
	C23.986,15.668,24,15.259,24,12s-0.014-3.668-0.072-4.948c-0.089-1.95-0.567-3.663-1.942-5.038
	c-1.375-1.375-3.088-1.853-5.038-1.942C15.668,0.014,15.259,0,12,0L12,0z"
    />
    <path
      fill={props.fill || '#282828'}
      d="M12,5.838c-3.403,0-6.162,2.759-6.162,6.162S8.597,18.162,12,18.162s6.162-2.759,6.162-6.162
	S15.403,5.838,12,5.838z M12,16c-2.209,0-4-1.791-4-4s1.791-4,4-4s4,1.791,4,4S14.209,16,12,16z"
    />
    <circle fill={props.fill || '#282828'} cx="18.406" cy="5.594" r="1.44" />
  </IconComponent>
);

export default Instagram;