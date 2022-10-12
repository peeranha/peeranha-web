import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const HintArrow: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    fill="currentColor"
    viewBox="0 0 4 38"
    size={[4, 38]}
  >
    <g fill="#D8D8D8">
      <path d="m4 15.968-2.573 2.555L4 21.115v.495l-.464.461-3.524-3.548L3.56 15l.44.443v.525Z" />
      <path d="M3 0h1v16H3zM3 21.2h1v16H3z" />
    </g>
  </IconComponent>
);

export default HintArrow;
