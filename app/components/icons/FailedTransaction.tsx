import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const FailedTransaction: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="tip"
    fill="currentColor"
    viewBox="0 0 36 36"
    size={[36, 36]}
  >
    <circle
      cx="18"
      cy="18"
      r="17"
      stroke="#7699FF"
      strokeOpacity="0.2"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M10 10L26 26M26 10L10 26"
      stroke="#F76F60"
      strokeLinecap="round"
      fill="none"
    />
  </IconComponent>
);

export default FailedTransaction;
