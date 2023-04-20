import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Coins: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent {...props} fill="currentColor" viewBox="0 0 18 20" size={props.size || [18, 20]}>
    <g fill={props.fill || '#FEF1F1'} fillRule="nonzero" className="stroke">
      <ellipse id="Oval-Copy-19" cx="6" cy="14.4000006" rx="3.5" ry="2.16666677" />
      <ellipse id="Oval-Copy-20" cx="6" cy="11.2000004" rx="3.5" ry="2.16666677" />
      <ellipse id="Oval-Copy-21" cx="6" cy="8.00000032" rx="3.5" ry="2.16666677" />
      <ellipse id="Oval-Copy-15" cx="12" cy="14.4000006" rx="3.5" ry="2.16666677" />
      <ellipse id="Oval-Copy-16" cx="12" cy="11.2000004" rx="3.5" ry="2.16666677" />
      <ellipse id="Oval-Copy-17" cx="12" cy="8.00000032" rx="3.5" ry="2.16666677" />
      <ellipse id="Oval-Copy-18" cx="12" cy="4.80000019" rx="3.5" ry="2.16666677" />
    </g>
  </IconComponent>
);

export default Coins;
