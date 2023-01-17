import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Administration: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="feed"
    fill="currentColor"
    viewBox="0 0 24 24"
    size={[24, 24]}
  >
    <g
      className="opacity"
      fill="#FFFFFF"
      strokeLinecap="square"
      strokeMiterlimit="10"
      stroke="#6283ca"
      transform="translate(.5 .5)"
    >
      <circle className="stroke" cx="12" cy="12" r="11" />
      <path
        className="stroke"
        d="M19 20.486v-.745a3 3 0 0 0-1.512-2.605l-3.219-1.842M9.727 15.292l-3.215 1.844A3 3 0 0 0 5 19.741v.745"
      />
      <path
        className="opacity stroke"
        d="M12 16h0a4 4 0 0 1-4-4v-2a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4z"
      />
    </g>
  </IconComponent>
);

export default Administration;
