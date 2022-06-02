import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Close: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="close"
    fill="curentColor"
    viewBox="0 0 18 18"
    size={[18, 18]}
  >
    <g fill={props.fill || '#282828'} fill-rule="nonzero">
      <path d="m1.575.868 15.557 15.557-.707.707L.868 1.575z" />
      <path d="M17.132 1.575 1.575 17.132l-.707-.707L16.425.868z" />
    </g>
  </IconComponent>
);

export default Close;
