import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const In: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="in"
    fill="curentColor"
    viewBox="0 0 20 20"
    size={[20, 20]}
  >
    <path d="M19.455 19.876h-4.323v-7.35c0-1.189-1.297-2.054-2.378-2.054-1.081 0-1.946.973-1.946 2.054v7.35H6.485V6.905h4.323v2.162c.757-1.189 2.594-1.946 3.783-1.946a4.843 4.843 0 0 1 4.864 4.864v7.891m-15.132 0H-.001V6.905h4.324v12.971M2.161.42c1.189 0 2.162.972 2.162 2.161a2.168 2.168 0 0 1-2.162 2.162A2.168 2.168 0 0 1-.001 2.581C-.001 1.392.972.42 2.161.42z" />
  </IconComponent>
);

export default In;
