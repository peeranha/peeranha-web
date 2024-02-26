import React from 'react';
import IconComponent, { IconProps } from '../IconComponent';

const AwardGraph: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent {...props} fill="none" viewBox="0 0 32 32" size={props.size || [32, 32]}>
    <path
      d="M16.0013 20C21.156 20 25.3346 15.8213 25.3346 10.6667C25.3346 5.51201 21.156 1.33334 16.0013 1.33334C10.8466 1.33334 6.66797 5.51201 6.66797 10.6667C6.66797 15.8213 10.8466 20 16.0013 20Z"
      stroke={props.stroke || '#E1E1E4'}
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.9454 18.52L9.33203 30.6667L15.9987 26.6667L22.6654 30.6667L21.052 18.5067"
      fill="none"
      stroke={props.stroke || '#E1E1E4'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </IconComponent>
);

export default AwardGraph;
