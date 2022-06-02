import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const ProgressIndicator: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="progress-indicator"
    fill="curentColor"
    viewBox="0 0 24 24"
    size={[24, 24]}
  >
    <path
      fill={props.fill || '#282828'}
      fillRule="nonzero"
      d="M12 0v2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10c0-.665-.065-1.315-.189-1.943l1.924-.577c.174.812.265 1.655.265 2.52 0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0z"
    />
  </IconComponent>
);

export default ProgressIndicator;
