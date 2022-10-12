import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Hat: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    fill="currentColor"
    viewBox="0 0 24 24"
    size={[24, 24]}
  >
    <path
      d="M22.5 11.5V16.5"
      stroke={props.stroke || '#282828'}
      fill={props.fill || 'none'}
      className="stroke"
    />
    <path
      d="M5 10V18.5C5 20.157 8.134 21.5 12 21.5C15.866 21.5 19 20.157 19 18.5V10"
      stroke={props.stroke || '#282828'}
      fill={props.fill || 'none'}
      className="stroke"
    />
    <path
      d="M12 13.5L2 8.5L12 3.5L22 8.5L12 13.5Z"
      stroke={props.stroke || '#282828'}
      fill={props.fill || 'none'}
      className="stroke"
    />
  </IconComponent>
);

export default Hat;
