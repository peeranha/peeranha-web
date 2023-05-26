import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const ContactTelegram: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent {...props} id="telegram" fill="currentColor" viewBox="0 0 24 24" size={[24, 24]}>
    <rect width="24" height="24" rx="12" fill={props.fill || '#282828'} />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.43202 11.8733C8.93026 10.3492 11.263 9.3444 12.4302 8.85893C15.7627 7.47282 16.4551 7.23203 16.9065 7.22408C17.0058 7.22234 17.2277 7.24694 17.3715 7.3636C17.4929 7.46211 17.5263 7.59518 17.5423 7.68857C17.5583 7.78197 17.5782 7.99473 17.5623 8.16097C17.3818 10.0585 16.6003 14.6631 16.2028 16.7884C16.0346 17.6876 15.7034 17.9891 15.3827 18.0186C14.6859 18.0828 14.1567 17.5581 13.4817 17.1157C12.4256 16.4233 11.8289 15.9924 10.8037 15.3168C9.61896 14.536 10.387 14.1069 11.0622 13.4056C11.2389 13.2221 14.3093 10.4294 14.3687 10.176C14.3762 10.1443 14.3831 10.0262 14.3129 9.96385C14.2427 9.90148 14.1392 9.92281 14.0644 9.93977C13.9585 9.96381 12.2713 11.079 9.00276 13.2853C8.52385 13.6142 8.09007 13.7744 7.70141 13.766C7.27295 13.7568 6.44876 13.5238 5.83606 13.3246C5.08456 13.0803 4.48728 12.9512 4.53929 12.5363C4.56638 12.3202 4.86395 12.0992 5.43202 11.8733Z"
      fill="#EAECF4"
    />
  </IconComponent>
);

export default ContactTelegram;