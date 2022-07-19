import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const UsersBig: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="users-big"
    fill="curentColor"
    viewBox="0 0 43 43"
    size={[43, 43]}
  >
    <g transform="translate(6 8)" fill="none">
      <circle
        stroke={props.stroke || '#282828'}
        strokeWidth="2"
        cx="9.5"
        cy="10.5"
        r="4.5"
      />
      <circle
        stroke={props.stroke || '#282828'}
        strokeWidth="2"
        cx="22.5"
        cy="6.5"
        r="4.5"
      />
      <path
        d="M16 22.778C16 19.041 12.872 16 9 16s-7 3.041-7 6.778c0 2.963 14 2.963 14 0ZM30 18.778C30 15.041 26.87 12 22.995 12c-2.515 0-4.794 1.292-6.044 3.349a6.577 6.577 0 0 0-.961 3.43c0 .376.34.78 1.121 1.171C21.038 21.918 30 20.913 30 18.778Z"
        stroke={props.stroke || '#282828'}
        strokeWidth="2"
      />
      <path
        d="M15.324 22.667c0-3.737-3.13-6.778-7.005-6.778s-7.005 3.041-7.005 6.778c0 2.963 14.01 2.963 14.01 0Z"
        stroke={props.stroke || '#282828'}
        strokeWidth="2"
      />
      <circle
        stroke={props.stroke || '#282828'}
        fill="#FFF"
        cx="8.5"
        cy="9.5"
        r="5"
      />
      <circle
        stroke={props.stroke || '#282828'}
        fill="#BEBEBE"
        cx="21.5"
        cy="5.5"
        r="5"
      />
      <path
        d="M29.5 17.778c0-4.01-3.572-7.278-8-7.278-2.875 0-5.479 1.39-6.905 3.6a6.777 6.777 0 0 0-1.095 3.678c0 .59.494 1.144 1.49 1.614 4.478 2.113 14.51 1.054 14.51-1.614Z"
        stroke={props.stroke || '#282828'}
        fill="#BEBEBE"
      />
      <path
        d="M16.5 21.778c0-4.01-3.572-7.278-8-7.278s-8 3.269-8 7.278c0 3.63 16 3.63 16 0Z"
        stroke={props.stroke || '#282828'}
        fill="#FFF"
      />
    </g>
  </IconComponent>
);

export default UsersBig;
