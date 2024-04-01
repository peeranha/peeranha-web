import React from 'react';
import IconComponent, { IconProps } from '../IconComponent';

const AnswerUpvotedGraph: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent {...props} fill="none" viewBox="0 0 32 32" size={props.size || [32, 32]}>
    <g clipPath="url(#clip0_1637_40714)">
      <path
        d="M16 8H25.3333C26.0406 8 26.7189 8.28095 27.219 8.78105C27.719 9.28115 28 9.95942 28 10.6667V28L22.6667 22.6667H9.77778C9.07053 22.6667 8.39226 22.3857 7.89216 21.8856C7.39206 21.3855 7.11111 20.7072 7.11111 20V18.6667"
        stroke={props.stroke || '#E1E1E4'}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.10156 14C6.10156 14.4971 6.50451 14.9 7.00156 14.9C7.49862 14.9 7.90156 14.4971 7.90156 14L7.90156 6.60817L10.0466 8.65166C10.4065 8.99451 10.9761 8.9807 11.319 8.62081C11.6618 8.26093 11.648 7.69125 11.2882 7.34839L7.55486 3.79181C7.38186 3.627 7.15043 3.53775 6.91157 3.54372C6.67271 3.54969 6.44603 3.6504 6.28149 3.82365L2.90367 7.38024C2.56137 7.74065 2.57605 8.31031 2.93647 8.65261C3.29688 8.99491 3.86654 8.98022 4.20884 8.61981L6.10156 6.62691L6.10156 14Z"
        fill={props.fill || '#E1E1E4'}
      />
    </g>
    <defs>
      <clipPath id="clip0_1637_40714">
        <rect width="32" height="32" fill="white" transform="matrix(-1 0 0 1 32 0)" />
      </clipPath>
    </defs>
  </IconComponent>
);

export default AnswerUpvotedGraph;
