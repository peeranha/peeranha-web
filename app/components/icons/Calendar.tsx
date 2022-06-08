import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Calendar: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="calendar"
    fill="curentColor"
    viewBox="0 0 34 33"
    size={[34, 33]}
  >
    <g fill="none">
      <rect width="32" height="29" x="2" y="4" rx="3" />
      <rect
        width="31"
        height="28"
        x=".5"
        y="2.5"
        stroke={props.stroke || '#282828'}
        rx="3"
      />
      <rect width="2" height="5" x="8" fill="#282828" rx="1" />
      <rect width="2" height="5" x="15" fill="#282828" rx="1" />
      <rect width="2" height="5" x="22" fill="#282828" rx="1" />
      <path
        fill="#282828"
        d="M7 10h4v3H7zM7 16h4v3H7zM7 22h4v3H7zM14 10h4v3h-4zM14 16h4v3h-4zM14 22h4v3h-4zM21 10h4v3h-4zM21 16h4v3h-4zM21 22h4v3h-4z"
      />
    </g>
  </IconComponent>
);

export default Calendar;
