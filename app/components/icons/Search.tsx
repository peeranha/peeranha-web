import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Search: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="search"
    fill="curentColor"
    viewBox="0 0 17 17"
    size={[17, 17]}
  >
    <g stroke={props.stroke || '#282828'} fill="none">
      <path d="M11.621 11.121A6.5 6.5 0 1 0 2.43 1.93a6.5 6.5 0 0 0 9.192 9.192Zm-.707-.707a5.5 5.5 0 1 1-7.778-7.778 5.5 5.5 0 0 1 7.778 7.778Zm1.06.354-.706.707 4.95 4.95.707-.707-4.95-4.95Z" />
    </g>
  </IconComponent>
);

export default Search;
