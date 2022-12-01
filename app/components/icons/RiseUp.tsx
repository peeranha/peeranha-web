import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const RiseUp: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="rise-up"
    fill="currentColor"
    viewBox="0 0 13 13"
    size={[13, 13]}
  >
    <path
      stroke={props.stroke || '#282828'}
      fill="#FFF"
      fillOpacity=".2"
      d="M10.121 6.5 6.05.855 1.977 6.5H4.53v6h3.039v-6h2.552Z"
    />
  </IconComponent>
);

export default RiseUp;
