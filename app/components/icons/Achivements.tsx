import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Achivements: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="achivements"
    fill="curentColor"
    viewBox="0 0 16 16"
    size={[16, 16]}
  >
    <circle
      stroke={props.stroke || '#282828'}
      strokeWidth="1.2px"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      cx="8"
      cy="5"
      r="4.5"
      fill="none"
    />
    <polyline
      stroke={props.stroke || '#282828'}
      strokeWidth="1.2px"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      points="11.5,10.5 11.5,15.5 8,13.5 4.5,15.5 4.5,10.5 "
      fill="none"
    />
  </IconComponent>
);

export default Achivements;
