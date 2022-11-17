import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const SocialEmail: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="social-email"
    fill="none"
    viewBox="0 0 24 25"
    size={[24, 25]}
  >
    <path
      d="M1 6.5C1 5.39543 1.89543 4.5 3 4.5H21C22.1046 4.5 23 5.39543 23 6.5V18.5C23 19.6046 22.1046 20.5 21 20.5H3C1.89543 20.5 1 19.6046 1 18.5V6.5Z"
      fill="none"
      fillOpacity="0.2"
      stroke="#576FED"
      strokeWidth="2"
    />
    <path
      d="M1 6.5L12 15.5L23 6.5246"
      stroke="#576FED"
      strokeWidth="2"
      fill="none"
    />
  </IconComponent>
);

export default SocialEmail;
