import React from 'react';

import IconComponent, { IconProps } from './IconComponent';

const SearchAI = (props: IconProps) => (
  <IconComponent {...props} fill="none" viewBox="0 0 36 36" size={props.size || [36, 36]}>
    <rect width="36" height="36" rx="3" fill={props.fill || 'none'} />
    <path
      d="M11.6621 18H23.3288"
      stroke={props.stroke || '#BDBDBD'}
      strokeWidth="1.8"
      strokeLinecap="square"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M18.4941 12.166L24.3275 17.9993L18.4941 23.8327"
      stroke={props.stroke || '#BDBDBD'}
      strokeWidth="1.8"
      strokeLinecap="square"
      strokeLinejoin="round"
      fill="none"
    />
  </IconComponent>
);

export default SearchAI;
