import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Notifications: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    fill="currentColor"
    viewBox="0 0 18 18"
    size={props.size || [18, 18]}
  >
    <g fill="none">
      <path
        d="M2.602 13.1931L2.602 13.1931C2.79908 12.6492 3.00149 12.2943 3.18742 12.0386C3.35375 11.8099 3.51155 11.6524 3.678 11.4863C3.70029 11.4641 3.72273 11.4417 3.74538 11.419C3.93364 11.2299 4.14511 11.0076 4.29512 10.68C4.44528 10.3522 4.51602 9.96134 4.51602 9.44569V5.74074C4.51602 4.09056 5.23312 3.05394 6.14999 2.41209C7.09046 1.75371 8.26214 1.5 9.12713 1.5C9.99014 1.5 11.1011 1.75261 11.9826 2.4045C12.8416 3.0397 13.516 4.07589 13.516 5.74074V9.44569C13.516 9.97164 13.6019 10.3722 13.7798 10.7066C13.9543 11.0347 14.1966 11.2556 14.4039 11.4399C14.4216 11.4556 14.4391 11.4711 14.4565 11.4865C14.6504 11.6583 14.8317 11.8189 15.0166 12.0538C15.2149 12.3058 15.4254 12.6554 15.6202 13.1931L15.6202 13.1931C15.7199 13.4681 15.7617 13.8437 15.6756 14.1139C15.6363 14.2376 15.576 14.3231 15.4958 14.3811C15.4153 14.4393 15.2727 14.5 15.016 14.5H9.12424H9.09798H3.2062C2.94955 14.5 2.80696 14.4393 2.72646 14.3811C2.64619 14.3231 2.58591 14.2376 2.54658 14.1139C2.46056 13.8437 2.50234 13.4681 2.602 13.1931Z"
        fill="#fff"
        fillOpacity="0.2"
        stroke={props.stroke || '#282828'}
      />

      <mask fill="#fff">
        <path d="M11 15C11 16.1041 10.1046 17 9 17C7.89545 17 7 16.1043 7 15" />
      </mask>
      <path
        d="M10 15C10 15.5519 9.55211 16 9 16V18C10.657 18 12 16.6562 12 15H10ZM9 16C8.44781 16 8 15.5521 8 15H6C6 16.6565 7.34309 18 9 18V16Z"
        fill={props.fill || '#282828'}
      />
    </g>
  </IconComponent>
);

export default Notifications;
