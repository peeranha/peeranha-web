import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const DownVote: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="upVote"
    fill="currentColor"
    fill-rule="nonzero"
    viewBox="0 0 24 21"
    size={[18, 18]}
  >
    <path
      fill={props.fill || '#F76F60'}
      fillOpacity=".2"
      stroke={props.stroke || '#F76F60'}
      d="M19.505 14.5h-4.763l-.047.448-.195 1.89c0 1.807-1.802 3.662-3.628 3.662-.165
       0-.277-.078-.36-.254l-3.975-8.791a.38.38 0 0 1-.037-.162l.02-10.126C6.52.93 6.957.5
        7.215.5H18.21c1.203-.013 2.23.817 2.413 1.958l2.017 9.262c.136.852.017 1.458-.492
         2.028-.464.52-1.5.764-2.643.752z"
    />
    <path
      fill={props.fill || '#F76F60'}
      fillOpacity=".2"
      stroke={props.stroke || '#F76F60'}
      d="M6.066.5c.24 0 .434.194.434.434v11.132c0 .24-.194.434-.434.434H2.803A2.303
       2.303 0 0 1 .5 10.198V2.802A2.303 2.303 0 0 1 2.803.5h3.263z"
    />
  </IconComponent>
);

export default DownVote;
