import React from 'react';
import IconComponent, { IconProps } from '../IconComponent';

const TagGraph: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent {...props} fill="none" viewBox="0 0 32 32" size={props.size || [32, 32]}>
    <path
      d="M30.4138 17L18 4.58625C17.815 4.39972 17.5947 4.25184 17.352 4.1512C17.1093 4.05056 16.849 3.99916 16.5863 4H5.00001C4.73479 4 4.48044 4.10536 4.2929 4.29289C4.10537 4.48043 4.00001 4.73478 4.00001 5V16.5863C3.99917 16.849 4.05057 17.1093 4.15121 17.352C4.25185 17.5947 4.39973 17.815 4.58626 18L17 30.4137C17.1857 30.5995 17.4062 30.7469 17.6489 30.8474C17.8916 30.948 18.1517 30.9997 18.4144 30.9997C18.6771 30.9997 18.9372 30.948 19.1799 30.8474C19.4225 30.7469 19.643 30.5995 19.8288 30.4137L30.4138 19.8288C30.5995 19.643 30.7469 19.4225 30.8474 19.1798C30.948 18.9372 30.9997 18.6771 30.9997 18.4144C30.9997 18.1517 30.948 17.8916 30.8474 17.6489C30.7469 17.4062 30.5995 17.1857 30.4138 17ZM18.4138 29L6.00001 16.5863V6H16.5863L29 18.4138L18.4138 29ZM12 10.5C12 10.7967 11.912 11.0867 11.7472 11.3334C11.5824 11.58 11.3481 11.7723 11.074 11.8858C10.7999 11.9994 10.4983 12.0291 10.2074 11.9712C9.9164 11.9133 9.64913 11.7704 9.43935 11.5607C9.22957 11.3509 9.08671 11.0836 9.02883 10.7926C8.97095 10.5017 9.00066 10.2001 9.11419 9.92597C9.22772 9.65189 9.41998 9.41762 9.66666 9.2528C9.91333 9.08797 10.2033 9 10.5 9C10.8978 9 11.2794 9.15804 11.5607 9.43934C11.842 9.72064 12 10.1022 12 10.5Z"
      fill={props.fill || '#A7A7AD'}
      className={props.fill ? '' : 'fill'}
    />
  </IconComponent>
);

export default TagGraph;
