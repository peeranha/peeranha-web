import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Login: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="login"
    fill="currentColor"
    viewBox="0 0 20 20"
    size={[20, 20]}
  >
    <path
      d="M2000.01,58.017a10,10,0,1,1,10.01-10A10,10,0,0,1,2000.01,58.017Zm5.69-3.055a6.967,6.967,0,0,0-11.4,0A8.988,8.988,0,0,0,2005.7,54.961ZM2000,39a9,9,0,0,0-6.44,15.28,7.962,7.962,0,0,1,12.88,0A9,9,0,0,0,2000,39Zm-0.01,10a3.5,3.5,0,1,1,3.5-3.5A3.5,3.5,0,0,1,1999.99,49Zm0-6a2.5,2.5,0,1,0,2.5,2.5A2.5,2.5,0,0,0,1999.99,43Z"
      transform="translate(-1990 -38)"
    />
  </IconComponent>
);

export default Login;
