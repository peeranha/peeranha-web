import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const UpVote: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    fill="currentColor"
    fill-rule="nonzero"
    viewBox="0 0 24 21"
    size={[18, 18]}
  >
    <path
      fill={props.fill || '#28A745'}
      fillOpacity=".163"
      stroke={props.stroke || '#28A745'}
      d="M19.505 6.5h-4.763l-.047-.448-.195-1.89C14.5 2.355 12.698.5 10.872.5c-.165
      0-.277.078-.36.254L6.537 9.545a.38.38 0 0 0-.037.162l.02 10.126c0 .237.437.667.695.667H18.21c1.203.013
      2.23-.817 2.413-1.958L22.64 9.28c.136-.852.017-1.458-.492-2.028-.464-.52-1.5-.764-2.643-.752zM6.066
       20.5c.24 0 .434-.194.434-.434V8.934a.434.434 0 0 0-.434-.434H2.803A2.303 2.303 0 0 0 .5 10.802v7.396A2.303
        2.303 0 0 0 2.803 20.5h3.263z"
    />
  </IconComponent>
);

export default UpVote;
