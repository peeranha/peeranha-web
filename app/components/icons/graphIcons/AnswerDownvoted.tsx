import React from 'react';
import IconComponent, { IconProps } from '../IconComponent';

const AnswerDownvotedGraph: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent {...props} fill="none" viewBox="0 0 32 32" size={props.size || [32, 32]}>
    <g clipPath="url(#clip0_1637_40724)">
      <path
        d="M15.1111 8H25.3333C26.0406 8 26.7189 8.28095 27.219 8.78105C27.719 9.28115 28 9.95942 28 10.6667V28L22.6667 22.6667H9.77778C9.07053 22.6667 8.39226 22.3857 7.89216 21.8856C7.39206 21.3855 7.11111 20.7072 7.11111 20V18.6667"
        stroke={props.stroke || '#E1E1E4'}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.90156 5.00001C7.90156 4.50295 7.49862 4.10001 7.00156 4.10001C6.50451 4.10001 6.10156 4.50295 6.10156 5.00001L6.10156 12.0376L4.20884 10.0447C3.86654 9.6843 3.29688 9.66961 2.93647 10.0119C2.57605 10.3542 2.56137 10.9239 2.90367 11.2843L6.28149 14.8409C6.44603 15.0141 6.67271 15.1148 6.91157 15.1208C7.15043 15.1268 7.38186 15.0375 7.55486 14.8727L11.2882 11.3161C11.648 10.9733 11.6618 10.4036 11.319 10.0437C10.9761 9.68382 10.4065 9.67001 10.0466 10.0129L7.90156 12.0563L7.90156 5.00001Z"
        fill={props.fill || '#E1E1E4'}
      />
    </g>
    <defs>
      <clipPath id="clip0_1637_40724">
        <rect width="32" height="32" fill="white" transform="matrix(-1 0 0 1 32 0)" />
      </clipPath>
    </defs>
  </IconComponent>
);

export default AnswerDownvotedGraph;
