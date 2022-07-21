import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Checked: React.FC<IconProps> = ({ stroke }): JSX.Element => (
  <IconComponent
    id="block"
    fill="currentColor"
    viewBox="0 0 13 10"
    size={[13, 10]}
  >
    <g stroke={stroke || '#282828'} fill="none">
      <path
        fill="none"
        stroke="#000"
        strokeWidth="2"
        d="M1.213 4.923a.142.142 0 0 0-.178.014c-.047.046-.047.115.045.209l3.117 3.522a.142.142 0 0 0 .197 0L11.965 1.2a.11.11 0 0 0 0-.161.142.142 0 0 0-.196.001L4.23 8.473l-3.017-3.55z"
      />
    </g>
  </IconComponent>
);

export default Checked;
