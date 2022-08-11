import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const ArrowDownFill: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="arrow-down-fill"
    fill="curentColor"
    viewBox="0 0 8 6"
    size={[8, 6]}
  >
    <path d="M3.536 3.657 6.364.828l.707.708-2.828 2.828-.707.707L0 1.536.707.828l2.829 2.829Z" />
  </IconComponent>
);

export default ArrowDownFill;
