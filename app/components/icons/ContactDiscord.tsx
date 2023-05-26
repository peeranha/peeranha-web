import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const ContactDiscord: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent {...props} id="discord" fill="currentColor" viewBox="0 0 24 24" size={[24, 24]}>
    <rect width="24" height="24" rx="12" fill={props.fill || '#282828'} />
    <path
      d="M17.8219 6.49423C16.7511 5.98777 15.6029 5.61463 14.4023 5.40092C14.3804 5.3968 14.3586 5.4071 14.3473 5.42772C14.1997 5.69847 14.0361 6.05168 13.9215 6.3293C12.6303 6.13002 11.3456 6.13002 10.0808 6.3293C9.96623 6.04551 9.79671 5.69847 9.64838 5.42772C9.63711 5.40779 9.61527 5.39748 9.59341 5.40092C8.39351 5.61395 7.24527 5.98709 6.17383 6.49423C6.16455 6.49835 6.1566 6.50523 6.15133 6.51416C3.97335 9.86831 3.37671 13.14 3.6694 16.3712C3.67073 16.387 3.67933 16.4021 3.69125 16.4117C5.12822 17.4995 6.52017 18.1599 7.88627 18.5976C7.90813 18.6045 7.9313 18.5963 7.94521 18.5777C8.26836 18.1228 8.55643 17.6431 8.80341 17.1387C8.81798 17.1092 8.80407 17.0741 8.77428 17.0625C8.31737 16.8838 7.8823 16.6659 7.46379 16.4186C7.43068 16.3986 7.42803 16.3498 7.45849 16.3265C7.54656 16.2584 7.63465 16.1877 7.71874 16.1162C7.73396 16.1031 7.75516 16.1004 7.77305 16.1086C10.5225 17.4026 13.4991 17.4026 16.216 16.1086C16.2339 16.0997 16.2551 16.1025 16.271 16.1155C16.3551 16.187 16.4432 16.2584 16.5319 16.3265C16.5624 16.3498 16.5604 16.3986 16.5273 16.4186C16.1088 16.6708 15.6737 16.8838 15.2161 17.0618C15.1863 17.0735 15.1731 17.1092 15.1877 17.1387C15.44 17.6424 15.728 18.1221 16.0452 18.577C16.0585 18.5963 16.0823 18.6045 16.1041 18.5976C17.4769 18.1599 18.8688 17.4995 20.3058 16.4117C20.3184 16.4021 20.3263 16.3876 20.3276 16.3718C20.6779 12.6363 19.7409 9.39141 17.8437 6.51484C17.8391 6.50523 17.8312 6.49835 17.8219 6.49423ZM9.21399 14.4037C8.38622 14.4037 7.70417 13.6204 7.70417 12.6583C7.70417 11.6962 8.373 10.9128 9.21399 10.9128C10.0616 10.9128 10.737 11.7031 10.7238 12.6583C10.7238 13.6204 10.055 14.4037 9.21399 14.4037ZM14.7963 14.4037C13.9686 14.4037 13.2865 13.6204 13.2865 12.6583C13.2865 11.6962 13.9553 10.9128 14.7963 10.9128C15.6439 10.9128 16.3194 11.7031 16.3061 12.6583C16.3061 13.6204 15.6439 14.4037 14.7963 14.4037Z"
      fill="#EAECF4"
    />
  </IconComponent>
);

export default ContactDiscord;