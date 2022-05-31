import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Choise: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="choise"
    fill="curentColor"
    viewBox="0 0 18 20"
    size={[18, 20]}
  >
    <path
      fill="#000"
      fillRule="nonzero"
      d="M8.852 0a1.1 1.1 0 0 0-.812.364L3.75 5.002 1.96 3.069a1.099 1.099 0 0 0-.811-.364 1.1 1.1 0 0 0-.813.364A1.286 1.286 0 0 0 0 3.947c0 .331.12.643.336.878l2.601 2.811A1.1 1.1 0 0 0 3.75 8a1.1 1.1 0 0 0 .812-.364L9.664 2.12a1.316 1.316 0 0 0 0-1.756A1.1 1.1 0 0 0 8.852 0"
    />
  </IconComponent>
);

export default Choise;
