import React from 'react';
import { css } from '@emotion/react';
import IconComponent, { IconProps } from './IconComponent';

const Plus: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="plus"
    fill="curentColor"
    viewBox="0 0 18 18"
    size={[18, 18]}
  >
    <path
      d="M13.9497 14.4497C11.2161 17.1834 6.78392 17.1834 4.05025 14.4497C1.31658 11.7161 1.31658 7.28392 4.05025 4.55025C6.78392 1.81658 11.2161 1.81658 13.9497 4.55025C16.6834 7.28392 16.6834 11.7161 13.9497 14.4497Z"
      fill="#7699FF"
      fillOpacity="0.2"
      stroke="#576FED"
    />
    <path d="M13.5 9V10H4.5V9H13.5Z" fill="#576FED" />
    <path d="M9.5 14H8.5V5H9.5V14Z" fill="#576FED" />
  </IconComponent>
);

export default Plus;
