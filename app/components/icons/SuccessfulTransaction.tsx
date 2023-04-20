import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const SuccessfulTransaction: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent {...props} fill="none" viewBox="0 0 36 36" size={[36, 36]}>
    <circle cx="18" cy="18" r="17" stroke="#A5BCFF" fill="none" />
    <path
      d="M27.3332 11.3335L13.9998 24.6668L8.6665 19.3335"
      stroke="#576FED"
      strokeLinecap="round"
      fill="none"
    />
  </IconComponent>
);

export default SuccessfulTransaction;
