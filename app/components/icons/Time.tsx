import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Time: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent {...props} id="tutorial" fill="currentColor" viewBox="0 0 24 24" size={[24, 24]}>
    <g fill="none">
      <path
        d="M12.0042 6L12.0035 12.0044L16.2432 16.2441M12 22C17.5229 22 22 17.5229 22 12C22 6.47715 17.5229 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5229 6.47715 22 12 22Z"
        stroke={props.stroke || 'rgba(40, 40, 40, 1)'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </IconComponent>
);

export default Time;
