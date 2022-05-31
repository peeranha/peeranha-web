import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const ArrowRight: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="arrow-right"
    fill="curentColor"
    viewBox="0 0 18 18"
    size={[18, 18]}
  >
    <path
      d="M2.5 7.5v4h6v3.522L16.146 9.5 8.5 3.978V7.5h-6Z"
      fillRule="nonzero"
      stroke={props.stroke || '#282828'}
      fill="#FFF"
      fillOpacity=".2"
    />
  </IconComponent>
);

export default ArrowRight;
