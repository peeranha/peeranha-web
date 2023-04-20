import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Moderation: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent {...props} fill="currentColor" viewBox="0 0 24 24" size={props.size || [18, 18]}>
    <g fill="none">
      <circle cx="12" cy="7" r="5" stroke={props.stroke || '#282828'} />
      <path
        d="M16.2228 13.2913C16.4779 13.397 16.7704 13.2758 16.8761 13.0207C16.9818 12.7656 16.8606 12.4731 16.6055 12.3674L16.2228 13.2913ZM10.2035 22.3783C10.4771 22.416 10.7293 22.2248 10.767 21.9512C10.8047 21.6776 10.6134 21.4253 10.3398 21.3877L10.2035 22.3783ZM4.5 17C4.5 15.8539 5.24467 14.7406 6.60815 13.8885C7.96457 13.0407 9.86958 12.5 12 12.5V11.5C9.71214 11.5 7.61715 12.0786 6.07815 13.0405C4.54619 13.9979 3.5 15.3847 3.5 17H4.5ZM12 12.5C13.571 12.5 15.0228 12.7942 16.2228 13.2913L16.6055 12.3674C15.2751 11.8163 13.6921 11.5 12 11.5V12.5ZM10.3398 21.3877C8.61434 21.1502 7.13277 20.5536 6.09519 19.7563C5.05662 18.9583 4.5 17.9935 4.5 17H3.5C3.5 18.3971 4.28549 19.6269 5.48589 20.5493C6.68727 21.4724 8.34154 22.1221 10.2035 22.3783L10.3398 21.3877Z"
        fill={props.fill || '#282828'}
      />
      <path d="M16 23H13V20L20 13L23 16L16 23Z" stroke={props.stroke || '#282828'} />
    </g>
  </IconComponent>
);

export default Moderation;
