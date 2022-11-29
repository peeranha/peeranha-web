import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const EyeClosed: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="eye-closed"
    fill="currentColor"
    viewBox="0 0 22 14"
    size={[22, 14]}
  >
    <path d="M10 8h2v4h-2zM6.691 7l1.813.845-1.69 3.625L5 10.625zM15.812 7L14 7.845l1.691 3.625 1.813-.845zM2.828 5l1.415 1.414-2.829 2.828L0 7.828zM19.164 5L17.75 6.414l2.828 2.828 1.415-1.414z" />
    <path d="M2 2c0 2.761 4.03 5 9 5s9-2.239 9-5h2c0 3.866-4.925 7-11 7S0 5.866 0 2h2z" />
  </IconComponent>
);

export default EyeClosed;
