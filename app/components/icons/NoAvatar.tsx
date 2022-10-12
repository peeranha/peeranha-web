import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const NoAvatar: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    fill="currentColor"
    viewBox="0 0 48 48"
    size={[48, 48]}
  >
    <g fill="none">
      <g stroke={props.stroke || '#282828'} opacity=".9">
        <path
          fillOpacity=".2"
          fill="#FFF"
          d="M5 2.5A3.5 3.5 0 0 0 1.5 6v23A3.5 3.5 0 0 0 5 32.5h38a3.5 3.5 0 0 0 3.5-3.5V6A3.5 3.5 0 0 0 43 2.5H5Zm19 24.618c-5.356 0-9.7-4.305-9.7-9.618 0-5.313 4.344-9.618 9.7-9.618 5.356 0 9.7 4.305 9.7 9.618 0 5.313-4.344 9.618-9.7 9.618ZM41.48 9.794a2.332 2.332 0 0 1-2.34-2.323 2.332 2.332 0 0 1 2.34-2.324c1.291 0 2.34 1.04 2.34 2.324a2.332 2.332 0 0 1-2.34 2.323Z"
        />
        <path d="M17.55 2.5h13.9A2.5 2.5 0 0 0 29 .5h-9a2.5 2.5 0 0 0-2.45 2Z" />
      </g>
    </g>
  </IconComponent>
);

export default NoAvatar;
