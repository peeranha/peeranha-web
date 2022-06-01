import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const PinterestLogoSmal: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="pinterest-logo-small"
    fill="curentColor"
    viewBox="0 0 24 24"
    size={[24, 24]}
  >
    fill={props.fill || '#282828'}
  </IconComponent>
);

export default PinterestLogoSmal;
