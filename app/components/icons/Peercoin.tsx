import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Peercoin: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="peercoin"
    fill="currentColor"
    viewBox="0 0 25 25"
    size={[25, 25]}
  >
    <path
      d="m13.775 18.249-7.41-5.559-4.698 2.742V9.569l4.698 2.741 7.41-5.558c6.344 1.002 9.559 2.935 9.559 5.748 0 2.812-3.215 4.744-9.559 5.749m4.559-12.182V0h-1.667v5.637A37.205 37.205 0 0 0 13.333 5V0h-1.666v6.25L6.25 10.312 0 6.667v11.667l6.25-3.647 5.417 4.063V25h1.667v-5a37.805 37.805 0 0 0 3.333-.636V25h1.666v-6.068C22.773 17.582 25 15.437 25 12.5c0-2.938-2.228-5.081-6.666-6.433Z"
      fill="#000"
      stroke={props.stroke}
    />
  </IconComponent>
);

export default Peercoin;
