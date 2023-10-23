import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Wallet: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="wallet"
    fill="currentColor"
    stroke="currentColor"
    viewBox="0 0 23 22"
    size={[23, 22]}
  >
    <path
      fill={props.fill || '#fff'}
      d="M21.5 7.25V19.25M8.49105 4.98445L15.3924 1L17.6985 4.99445L8.49105 4.98445ZM1.5 6C1.5 5.4477 1.94771 5 2.5 5H20.5C21.0523 5 21.5 5.4477 21.5 6V20C21.5 20.5523 21.0523 21 20.5 21H2.5C1.94771 21 1.5 20.5523 1.5 20V6ZM17.125 15.5H21.5V10.5H17.125C15.6753 10.5 14.5 11.6193 14.5 13C14.5 14.3807 15.6753 15.5 17.125 15.5Z"
      stroke={'#344054'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </IconComponent>
);

export default Wallet;
