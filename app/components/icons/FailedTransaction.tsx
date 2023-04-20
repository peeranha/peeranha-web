import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const FailedTransaction: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent {...props} fill="currentColor" viewBox="0 0 36 36" size={props.size || [24, 24]}>
    <circle
      cx="18"
      cy="18"
      r="17"
      stroke={props.stroke || '#7699FF'}
      strokeOpacity={props.strokeOpacity || 0.2}
      strokeWidth="2"
      fill={props.fill || 'none'}
      fillOpacity={props.fillOpacity || 1}
    />
    <path
      d="M10 10L26 26M26 10L10 26"
      stroke={props.stroke || '#F76F60'}
      strokeLinecap="round"
      strokeWidth="2"
      fill={props.fill || 'none'}
    />
  </IconComponent>
);

export default FailedTransaction;
