import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const ReloadRounded: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="reload-rounded"
    fill="currentColor"
    viewBox="0 0 15 15"
    size={[15, 15]}
  >
    <g fill="none">
      <rect
        x="0.5"
        y="0.5"
        width="14"
        height="14"
        rx="7"
        fill="#7699FF"
        fillOpacity="0.2"
      />
      <path
        d="M11.1591 7.41939C11.1591 9.48197 9.47688 11.16 7.40909 11.16C6.28494 11.16 5.22813 10.6562 4.51852 9.79975H6.20455V9.4597H4V11.66H4.34091V10.1184C5.11307 10.9911 6.2275 11.5 7.40909 11.5C9.66489 11.5 11.5 9.66934 11.5 7.41939H11.1591Z"
        fill={props.fill || '#282828'}
        stroke={props.stroke || '#282828'}
        strokeWidth="0.7"
      />
      <path
        d="M8.79545 5.54032H11V3.34006H10.6591V4.88147C9.88693 4.00872 8.77284 3.50001 7.59091 3.50001C5.33528 3.50001 3.5 5.33068 3.5 7.58063H3.84091C3.84091 5.51804 5.52312 3.84006 7.59091 3.84006C8.71557 3.84006 9.77187 4.34367 10.4815 5.20027H8.79545V5.54032Z"
        fill={props.fill || '#282828'}
        stroke={props.stroke || '#282828'}
        strokeWidth="0.7"
      />
      <rect
        x="0.5"
        y="0.5"
        width="14"
        height="14"
        rx="7"
        stroke={props.stroke || '#282828'}
      />
    </g>
  </IconComponent>
);

export default ReloadRounded;
