import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const PlusWithoutCircle: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    fill="currentColor"
    viewBox="0 0 14 14"
    size={[14, 14]}
  >
    <path d="M8 0v14H6V0z" fill={props.fill || '#282828'} />
    <path d="M0 6h14v2H0z" fill={props.fill || '#282828'} />
  </IconComponent>
);

export default PlusWithoutCircle;
