import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const YoutubeLogoSmal: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="youtube-logo-small"
    fill="curentColor"
    viewBox="0 0 24 24"
    size={[24, 24]}
  >
    <g>
      <path
        fill={props.fill || '#282828'}
        d="M23.8,7.2c0,0-0.2-1.7-1-2.4c-0.9-1-1.9-1-2.4-1C17,3.6,12,3.6,12,3.6h0c0,0-5,0-8.4,0.2
	        c-0.5,0.1-1.5,0.1-2.4,1c-0.7,0.7-1,2.4-1,2.4S0,9.1,0,11.1v1.8c0,1.9,0.2,3.9,0.2,3.9s0.2,1.7,1,2.4c0.9,1,2.1,0.9,2.6,1
	        c1.9,0.2,8.2,0.2,8.2,0.2s5,0,8.4-0.3c0.5-0.1,1.5-0.1,2.4-1c0.7-0.7,1-2.4,1-2.4s0.2-1.9,0.2-3.9v-1.8C24,9.1,23.8,7.2,23.8,7.2z
	        M9.5,15.1l0-6.7l6.5,3.4L9.5,15.1z"
      />
    </g>
  </IconComponent>
);

export default YoutubeLogoSmal;
