import React from 'react';

import IconComponent, { IconProps } from './IconComponent';

const SearchAI = (props: IconProps) => (
  <IconComponent {...props} fill="none" viewBox="0 0 24 24" size={props.size || [24, 24]}>
    <circle
      cx="11"
      cy="11"
      r="6"
      stroke={props.stroke || 'rgba(40,40,40,1)'}
      fill={'rgba(0, 0, 0, 0)'}
    />
    <path
      d="M15.5 15.5L20 20"
      stroke={props.stroke || 'rgba(40,40,40,1)'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </IconComponent>
);

export default SearchAI;
