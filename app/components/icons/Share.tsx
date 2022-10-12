import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Share: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent {...props} viewBox="0 0 18 18" size={props.size || [18, 18]}>
    <g>
      <g>
        <circle
          cx="4"
          cy="9"
          r="2.5"
          fill="#282828"
          fillOpacity="0.2"
          stroke={props.stroke || '#282828'}
        />
        <circle
          cx="13"
          cy="3"
          r="2.5"
          fill="#282828"
          fillOpacity="0.2"
          stroke={props.stroke || '#282828'}
        />
        <circle
          cx="13"
          cy="15"
          r="2.5"
          fill="#282828"
          fillOpacity="0.2"
          stroke={props.stroke || '#282828'}
        />
      </g>
      <path d="M6 8L11 4" stroke={props.stroke || '#282828'} />
      <path d="M6 10L11 14" stroke={props.stroke || '#282828'} />
    </g>
  </IconComponent>
);

export default Share;
