import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const PinterestLogoSmal: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="pinterest-logo-small"
    fill="curentColor"
    viewBox="0 0 24 24"
    size={[24, 24]}
  >
    <g>
      <path
        d="M12,0C5.4,0,0,5.4,0,12c0,5.1,3.2,9.4,7.6,11.2c-0.1-0.9-0.2-2.4,0-3.4c0.2-0.9,1.4-6,1.4-6S8.7,13,8.7,12
	        c0-1.7,1-2.9,2.2-2.9c1,0,1.5,0.8,1.5,1.7c0,1-0.7,2.6-1,4c-0.3,1.2,0.6,2.2,1.8,2.2c2.1,0,3.8-2.2,3.8-5.5c0-2.9-2.1-4.9-5-4.9
	        c-3.4,0-5.4,2.6-5.4,5.2c0,1,0.4,2.1,0.9,2.7c0.1,0.1,0.1,0.2,0.1,0.3c-0.1,0.4-0.3,1.2-0.3,1.4c-0.1,0.2-0.2,0.3-0.4,0.2
	        c-1.5-0.7-2.4-2.9-2.4-4.6c0-3.8,2.8-7.3,7.9-7.3c4.2,0,7.4,3,7.4,6.9c0,4.1-2.6,7.5-6.2,7.5c-1.2,0-2.4-0.6-2.8-1.4
	        c0,0-0.6,2.3-0.7,2.9c-0.3,1-1,2.3-1.5,3.1C9.6,23.8,10.8,24,12,24c6.6,0,12-5.4,12-12C24,5.4,18.6,0,12,0z"
      />
    </g>
  </IconComponent>
);

export default PinterestLogoSmal;
