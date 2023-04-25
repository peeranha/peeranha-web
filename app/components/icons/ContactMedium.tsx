import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const ContactMedium: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent {...props} id="medium" fill="currentColor" viewBox="0 0 24 24" size={[24, 24]}>
    <svg>
      <rect width="24" height="24" rx="12" fill={props.fill || '#667085'} />
      <path
        d="M13.1321 12.2276C13.1321 15.0042 10.9005 17.2551 8.1479 17.2551C5.39529 17.2551 3.16357 15.0037 3.16357 12.2276C3.16357 9.45151 5.39512 7.19995 8.1479 7.19995C10.9007 7.19995 13.1321 9.451 13.1321 12.2276Z"
        fill="#EAECF4"
      />
      <path
        d="M18.5998 12.2277C18.5998 14.8413 17.484 16.9608 16.1076 16.9608C14.7313 16.9608 13.6155 14.8413 13.6155 12.2277C13.6155 9.61408 14.7311 7.49451 16.1075 7.49451C17.4839 7.49451 18.5996 9.6134 18.5996 12.2277"
        fill="#EAECF4"
      />
      <path
        d="M20.8363 12.2276C20.8363 14.5687 20.444 16.4678 19.9598 16.4678C19.4757 16.4678 19.0835 14.5692 19.0835 12.2276C19.0835 9.88595 19.4759 7.98743 19.9598 7.98743C20.4438 7.98743 20.8363 9.88578 20.8363 12.2276Z"
        fill="#EAECF4"
      />
    </svg>
  </IconComponent>
);

export default ContactMedium;
