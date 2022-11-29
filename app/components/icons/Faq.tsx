import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Faq: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="faq"
    fill="currentColor"
    viewBox="0 0 24 24"
    size={[24, 24]}
  >
    <g transform="translate(3 3)" fill="none">
      <path
        d="M7.952 10.744C7.6 8.248 10.144 7.336 10.144 5.64c0-.848-.528-1.552-1.552-1.552-.704 0-1.344.352-1.84.928L6 4.328C6.672 3.56 7.552 3 8.688 3c1.648 0 2.736.976 2.736 2.56 0 2.096-2.576 2.944-2.32 5.184H7.952Zm-.336 2.368c0-.608.416-1.024.944-1.024s.96.416.96 1.024c0 .576-.432.992-.96.992s-.944-.416-.944-.992Z"
        fill="#282828"
      />
      <circle stroke="#282828" cx="9" cy="9" r="9.5" />
    </g>
  </IconComponent>
);

export default Faq;
