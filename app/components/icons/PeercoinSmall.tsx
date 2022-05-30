import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const PeercoinSmall: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="peercoin"
    fill="curentColor"
    viewBox="0 0 15 15"
    size={[15, 15]}
  >
    <g stroke={props.stroke || '#282828'} fill="none">
      <path d="M8.265 10.95 3.82 7.613 1 9.26V5.741l2.82 1.645 4.445-3.335C12.071 4.652 14 5.812 14 7.501c0 1.686-1.929 2.845-5.735 3.448M11 3.64V0h-1v3.382A22.323 22.323 0 0 0 8 3V0H7v3.75L3.75 6.187 0 4v7l3.75-2.188L7 11.25V15h1v-3a22.683 22.683 0 0 0 2-.382V15h1v-3.64c2.663-.81 4-2.098 4-3.86 0-1.763-1.337-3.049-4-3.86Z" />
    </g>
  </IconComponent>
);

export default PeercoinSmall;
