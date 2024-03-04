import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const FailedTransaction: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="tip"
    fill="currentColor"
    viewBox="0 0 36 36"
    size={props.size || [24, 24]}
  >
    <circle
      cx="18"
      cy="18"
      r="17"
      stroke={props.stroke || 'rgb(111, 76, 255)'}
      strokeOpacity={props.strokeOpacity || 0.2}
      strokeWidth="2"
      fill={props.fill || 'none'}
      fillOpacity={props.fillOpacity || 1}
    />
    <path
      d="M10 10L26 26M26 10L10 26"
      stroke={props.stroke || 'rgba(237, 74, 109, 1)'}
      strokeLinecap="round"
      strokeWidth="2"
      fill={props.fill || 'none'}
    />
  </IconComponent>
);

export default FailedTransaction;
