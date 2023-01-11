import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const CloseRounded: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="close-rounded"
    fill="curentColor"
    viewBox="0 0 18 18"
    size={[18, 18]}
  >
    <circle cx="9" cy="9" r="7.5" stroke="white" />
    <rect
      x="12.017"
      y="5.22876"
      width="1.06667"
      height="9.6"
      transform="rotate(45 12.017 5.22876)"
      fill="white"
    />
    <rect
      x="12.7712"
      y="12.017"
      width="1.06667"
      height="9.6"
      transform="rotate(135 12.7712 12.017)"
      fill="white"
    />
  </IconComponent>
);

export default CloseRounded;
