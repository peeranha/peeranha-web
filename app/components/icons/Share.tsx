import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Share: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent {...props} id="share" fill="none">
    <g stroke="currentColor">
      <g fill="currentColor" fillOpacity=".2" transform="translate(1)">
        <circle cx="3" cy="9" r="2.5" />
        <circle cx="12" cy="3" r="2.5" />
        <circle cx="12" cy="15" r="2.5" />
      </g>
      <path d="m6 8 5-4M6 10l5 4" />
    </g>
  </IconComponent>
);

export default Share;
