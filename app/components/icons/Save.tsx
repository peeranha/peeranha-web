import React from 'react';
import { css } from '@emotion/react';
import IconComponent, { IconProps } from './IconComponent';

const Save: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="plus"
    fill="curentColor"
    viewBox="0 0 18 18"
    size={[18, 18]}
  >
    <path
      d="M4.5 13.5V9H13.5V13.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke={props.stroke}
    />
    <path
      d="M15 16.5H3C2.60218 16.5 2.22064 16.342 1.93934 16.0607C1.65804 15.7794 1.5 15.3978 1.5 15V3C1.5 2.60218 1.65804 2.22064 1.93934 1.93934C2.22064 1.65804 2.60218 1.5 3 1.5H12.75L16.5 5.25V15C16.5 15.3978 16.342 15.7794 16.0607 16.0607C15.7794 16.342 15.3978 16.5 15 16.5Z"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke={props.stroke}
    />
    <path
      d="M11.25 4.5V6"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke={props.stroke}
    />
  </IconComponent>
);

export default Save;
