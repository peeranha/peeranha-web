import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Edit: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="edit"
    fill="currentColor"
    viewBox="0 0 18 18"
    size={[18, 18]}
  >
    <g stroke={props.stroke || '#282828'}>
      <rect x=".5" y="17.5" width="15" height="1" rx=".5" />
      <path
        d="M1.501 12.935a.5.5 0 0 0 .528.537l3.824-.221a.5.5 0 0 0 .326-.147l8.182-8.253a.5.5 0 0 0-.002-.706L10.86.646a.5.5 0 0 0-.707 0L1.93 8.87a.5.5 0 0 0-.145.315l-.284 3.75Z"
        fillOpacity=".2"
      />
    </g>
  </IconComponent>
);

export default Edit;
