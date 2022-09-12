import React from 'react';
import { css } from '@emotion/react';
import IconComponent, { IconProps } from './IconComponent';

const Plus: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="plus"
    fill="currentColor"
    viewBox="0 0 14 14"
    size={props.size || [14, 14]}
  >
    <path d="M8 0v14H6V0z" fill={props.fill} />
    <path d="M0 6h14v2H0z" fill={props.fill} />
  </IconComponent>
);

export default Plus;
