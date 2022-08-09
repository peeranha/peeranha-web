import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const SearchFeed: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="searchFeed"
    fill="currentColor"
    viewBox="0 0 17 17"
    size={props.size || [17, 17]}
  >
    <g>
      <path
        fill={props.fill || '#282828'}
        d="M11.619 11.121A6.5 6.5 0 1 0 2.426 1.93a6.5 6.5 0 0 0 9.193 9.192zm-.708-.707a5.5 5.5 0 1 1-7.778-7.778 5.5 5.5 0 0 1 7.778 7.778zm1.061.354l-.707.707 4.95 4.95.707-.707-4.95-4.95z"
      />
    </g>
  </IconComponent>
);

export default SearchFeed;
