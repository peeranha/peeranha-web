import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const ContactEmail: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent {...props} id="email" viewBox="0 0 24 24" size={[24, 24]}>
    <circle cx="12" cy="12" r="12" fill={props.fill || '#282828'} />
    <path
      d="M18.4999 8L11.9999 12L5.49988 8M6.79988 7H17.1999C17.9149 7 18.4999 7.5625 18.4999 8.25V15.75C18.4999 16.4375 17.9149 17 17.1999 17H6.79988C6.08488 17 5.49988 16.4375 5.49988 15.75V8.25C5.49988 7.5625 6.08488 7 6.79988 7Z"
      stroke="#EAECF4"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </IconComponent>
);

export default ContactEmail;
