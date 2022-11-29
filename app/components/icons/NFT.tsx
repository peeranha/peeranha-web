import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const NFT: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    fill="currentColor"
    viewBox="0 0 18 18"
    size={props.size || [18, 18]}
  >
    <g fill="none">
      <path d="M5 12V17L9 15L13 17V12" stroke={props.stroke || '#282828'} />
      <circle
        cx="9"
        cy="7"
        r="6"
        fill={props.fill || '#fff'}
        fill-opacity="0.2"
        stroke={props.stroke || '#282828'}
      />
    </g>
  </IconComponent>
);

export default NFT;
