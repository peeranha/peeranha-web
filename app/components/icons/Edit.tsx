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
    <rect
      x="1.25"
      y="17.75"
      width="15.5"
      height="0.5"
      rx="0.25"
      stroke="#576FED"
      strokeWidth="0.5"
    />
    <path
      d="M3.02886 13.972C2.72683 13.9895 2.4786 13.7368 2.50142 13.4351L2.78512 9.68548C2.79414 9.56625 2.84559 9.4542 2.93014 9.36965L11.1533 1.14645C11.3486 0.951184 11.6652 0.951184 11.8604 1.14645L15.3592 4.64524C15.5539 4.83991 15.5546 5.15531 15.3608 5.35081L7.179 13.6037C7.09214 13.6913 6.97595 13.7438 6.85278 13.7509L3.02886 13.972Z"
      fill="#7699FF"
      fillOpacity="0.2"
      stroke="#576FED"
    />
  </IconComponent>
);

export default Edit;
