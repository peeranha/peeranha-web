import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const SocialTwitter: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent {...props} fill="currentColor" viewBox="0 0 24 24" size={[24, 24]}>
    <path
      d="M8.0453 20.1371C15.3185 20.1371 19.3015 14.112 19.3015 8.88909C19.3015 8.71604 19.3015 8.543 19.2858
      8.38569C20.0572 7.83508 20.7341 7.12717 21.2536 6.34059C20.5452 6.65522 19.7738 6.85973 18.9867 6.96985C19.8053
      6.48217 20.435 5.71133 20.7341 4.78317C19.9627 5.23938 19.1283 5.56974 18.2152 5.74279C17.4911 4.97194 16.4678
      4.5 15.3343 4.5C13.146 4.5 11.3828 6.27766 11.3828 8.44861C11.3828 8.76324 11.4143 9.06214 11.4773 9.34531C8.18698
      9.17226 5.27454 7.59911 3.32241 5.20792C2.97607 5.78999 2.78715 6.46644 2.78715 7.19009C2.78715 8.55873 3.47984 9.77006
      4.55036 10.478C3.9049 10.4622 3.29092 10.2735 2.75566 9.99029C2.75566 10.006 2.75566 10.0218 2.75566 10.0375C2.75566
      11.9567 4.1253 13.5456 5.93574 13.9074C5.60514 14.0018 5.25879 14.049 4.89671 14.049C4.64482 14.049 4.39293 14.0176
      4.15679 13.9704C4.66056 15.5435 6.12466 16.6919 7.85638 16.7234C6.50249 17.7774 4.80225 18.4224 2.94458 18.4224C2.62972
      18.4224 2.31486 18.4067 2 18.3595C3.73172 19.4764 5.8098 20.1371 8.0453 20.1371Z"
      fill="#576FED"
    />
  </IconComponent>
);

export default SocialTwitter;
