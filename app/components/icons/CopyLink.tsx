import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const CopyLink: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="delete"
    fill="currentColor"
    viewBox="0 0 18 18"
    size={[18, 18]}
  >
    <g transform="translate(1)" fill="none">
      <path
        d="M10.05 7.95001C11.55 9.45001 11.55 11.775 10.05 13.275L7.95 15.375C6.45 16.875 4.125 16.875 2.625 15.375C1.125 13.875 1.125 11.55 2.625 10.05L4.5 8.25001"
        stroke={props.stroke || '#282828'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.95 10.05C6.45 8.55 6.45 6.225 7.95 4.725L10.05 2.625C11.55 1.125 13.875 1.125 15.375 2.625C16.875 4.125 16.875 6.45 15.375 7.95L13.5 9.75"
        stroke={props.stroke || '#282828'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </IconComponent>
);

export default CopyLink;
