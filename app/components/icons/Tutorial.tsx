import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Tutorial: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="tutorial"
    fill="curentColor"
    viewBox="0 0 24 24"
    size={[24, 24]}
  >
    <g fill="none">
      <path
        fill="#000"
        d="M8 6h13v16H8zM4 4h4v18H6.03C4.596 22 4 20.955 4 19.773V4Z"
      />
      <path
        d="M5.999 2H21c-.667.388-1 1.054-1 2s.333 1.612 1 2H6c-1 0-2-.55-2-2s1-2 1.999-2Z"
        fill="#000"
      />
      <path fill="#FFF" d="M7 5h13v16H7z" />
      <path
        fill="#000"
        d="M7 20h12v1H7zM10 8h6v1h-6zM10 11h6v1h-6zM10 14h6v1h-6z"
      />
      <path
        d="M3.5 3.5v15.273c0 1.079.52 1.727 1.53 1.727H6.5v-17h-3Z"
        stroke={props.stroke || '#282828'}
        fill="#BEBEBE"
      />
      <path
        d="M18.838 4.5c-.225-.418-.338-.921-.338-1.5s.113-1.082.338-1.5H4.999C4.083 1.5 3.5 1.996 3.5 3S4.083 4.5 5 4.5h13.838Z"
        stroke={props.stroke || '#282828'}
        fill="#FFF"
      />
      <path fill="#BEBEBE" d="M19 5h1v16h-1z" />
    </g>
  </IconComponent>
);

export default Tutorial;
