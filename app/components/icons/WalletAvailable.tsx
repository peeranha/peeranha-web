import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const WalletAvailable: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="wallet-available"
    fill="curentColor"
    viewBox="0 0 14 16"
    size={[14, 16]}
  >
    <rect
      stroke={props.stroke || '#282828'}
      fill="none"
      x="0.5"
      y="4.5"
      width="13"
      height="10"
      rx="2"
    />
    <path
      stroke={props.stroke || '#282828'}
      fill="none"
      d="M0.601910561,4.5 L10.5,4.5 L10.5,1.89348811 C10.5,1.67536925 10.4524307,1.45987446 10.3606081,1.26202494 C10.0118606,0.510581864 9.11997991,0.184132577 8.36853684,0.532880053 L1.2395388,3.84147406 C0.947416463,3.97704911 0.723452828,4.21444917 0.601910561,4.5 Z"
    />
    <rect fill={props.fill || '#282828'} x="10" y="8" width="1" height="2" />
  </IconComponent>
);

export default WalletAvailable;
