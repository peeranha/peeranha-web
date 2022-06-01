import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Lock: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="lock"
    fill="curentColor"
    viewBox="0 0 13 16"
    size={[13, 16]}
  >
    <path
      fill="none"
      d="M3.5,5.5 L9.5,5.5 L9.5,2 C9.5,1.17157288 8.82842712,0.5 8,0.5 L5,0.5 C4.17157288,0.5 3.5,1.17157288 3.5,2 L3.5,5.5 Z"
    />
    <rect fill="none" x="0.5" y="5.5" width="12" height="10" rx="2" />
    <rect x="6" y="10" width="1" height="3" />
    <rect x="5" y="9" width="3" height="1" />
  </IconComponent>
);

export default Lock;
