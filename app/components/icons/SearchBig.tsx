import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const SearchBig: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="search-big"
    fill="curentColor"
    viewBox="0 0 43 43"
    size={[43, 43]}
  >
    <g fill="none" transform="translate(8 8)">
      <path
        fill={props.fill || '#FFF'}
        d="M20.343 16.515l6.264 6.263a2 2 0 1 1-2.829 2.829l-6.263-6.264A9.953 9.953 0 0 1 12 21C6.477 21 2 16.523 2 11S6.477 1 12 1s10 4.477 10 10c0 2.038-.61 3.934-1.657 5.515zM12 17a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
      />
      <rect
        width="3"
        height="12"
        x="18.51"
        y="14.01"
        fill={props.fill || '#FFF'}
        stroke={props.stroke || '#282828'}
        rx="1.5"
        transform="rotate(-45 20.01 20.01)"
      />
      <path
        fill={props.fill || '#FFF'}
        stroke={props.stroke || '#282828'}
        d="M10 19.5a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19zm0-3a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13z"
      />
    </g>
  </IconComponent>
);

export default SearchBig;
