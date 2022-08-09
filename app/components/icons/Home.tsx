import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Home: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="tags"
    fill="currentColor"
    viewBox="0 0 24 24"
    size={[24, 24]}
  >
    <g transform="translate(0.5, 0.5)">
      <polyline
        className="stroke"
        points="1 11 12 2 23 11"
        fill="none"
        stroke="#444444"
      />

      <polyline
        className="stroke"
        points="10 23 10 17 14 17 14 23"
        fill="none"
        stroke="#444444"
      />
      <polyline
        className="stroke"
        points="4 13 4 23 20 23 20 13"
        fill="none"
        stroke="#444444"
      />
    </g>
  </IconComponent>
);

export default Home;
