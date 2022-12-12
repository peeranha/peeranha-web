import React from 'react';
import { css } from '@emotion/react';
import IconComponent, { IconProps } from './IconComponent';

const Pin: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="plus"
    fill="curentColor"
    viewBox="0 0 18 18"
    size={[18, 18]}
  >
    <path
      d="M3.506 8.756L13.133 3.383L15.617 5.867L10.244 15.494L6.875 12.125L3.506 8.756Z"
      fill={props.fill || '#7699FF'}
      fillOpacity="0.2"
    />
    <path
      d="M11.75 2L17 7.25M6.875 12.125L2 17M6.875 12.125L10.244 15.494L15.617 5.867L13.133 3.383L3.506 8.756L6.875 12.125ZM2 7.25L11.75 17"
      stroke={props.stroke || '#576FED'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </IconComponent>
);

export default Pin;
