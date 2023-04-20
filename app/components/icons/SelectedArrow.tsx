import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const SelectedArrow: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent {...props} fill="currentColor" viewBox="0 0 16 16" size={[18, 18]}>
    <svg fill="none">
      <path
        d="M14.5 0.5L4.5 10.5L0.5 6.5"
        stroke={props.stroke || '#282828'}
        strokeLinecap="round"
      />
    </svg>
  </IconComponent>
);

export default SelectedArrow;
