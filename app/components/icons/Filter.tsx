import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Filter: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="filter"
    fill="currentColor"
    viewBox="0 0 18 18"
    size={[18, 18]}
  >
    <g stroke={props.stroke || '#282828'} fill="none">
      <circle
        fillOpacity=".2"
        fill={props.fill || '#282828'}
        cx="4.5"
        cy="8.5"
        r="2"
      />
      <circle
        fillOpacity=".2"
        fill={props.fill || '#282828'}
        cx="12.5"
        cy="2.5"
        r="2"
      />
      <circle
        fillOpacity=".2"
        fill={props.fill || '#282828'}
        cx="12.5"
        cy="14.5"
        r="2"
      />
      <path d="M.12 2.568h10.508M14.12 2.568h3M14.12 14.568h3M.12 8.568h2.508M6.12 8.568h10.508M.12 14.568h10.508" />
    </g>
  </IconComponent>
);

export default Filter;
