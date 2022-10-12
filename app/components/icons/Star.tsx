import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Star: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    fill="currentColor"
    viewBox="0 0 24 24"
    size={[24, 24]}
  >
    <path
      stroke={props.stroke || '#282828'}
      fill={props.fill || 'none'}
      d="m18.39 20.794-1.22-7.114 5.168-5.04-7.143-1.037L12 1.13 8.805 7.603 1.662 8.64 6.83 13.68l-1.22 7.114L12 17.435l6.39 3.36Z"
    />
  </IconComponent>
);

export default Star;
