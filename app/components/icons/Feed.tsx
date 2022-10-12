import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Feed: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    fill="currentColor"
    viewBox="0 0 24 24"
    size={props.size || [24, 24]}
  >
    <g fill={props.fill || '#fff'} className="opacity">
      <path
        d="M4.5 5.2C4.5 4.6317 4.50039 4.23554 4.52559 3.92712C4.55031 3.62454 4.5964 3.45069 4.66349 3.31901C4.8073 3.03677 5.03677 2.8073 5.31901 2.66349C5.45069 2.5964 5.62454 2.55031 5.92712 2.52559C6.23554 2.50039 6.6317 2.5 7.2 2.5H15.2256L19.5 6.65569V18.8C19.5 19.3683 19.4996 19.7645 19.4744 20.0729C19.4497 20.3755 19.4036 20.5493 19.3365 20.681C19.1927 20.9632 18.9632 21.1927 18.681 21.3365C18.5493 21.4036 18.3755 21.4497 18.0729 21.4744C17.7645 21.4996 17.3683 21.5 16.8 21.5H7.2C6.6317 21.5 6.23554 21.4996 5.92712 21.4744C5.62454 21.4497 5.45069 21.4036 5.31901 21.3365C5.03677 21.1927 4.8073 20.9632 4.66349 20.681C4.5964 20.5493 4.55031 20.3755 4.52559 20.0729C4.50039 19.7645 4.5 19.3683 4.5 18.8V5.2Z"
        stroke={props.stroke || '#282828'}
        className="stroke"
      />
      <path
        d="M14.5 2.5H14.9929L19.5 7.00711V7.5H17.2C16.6317 7.5 16.2355 7.49961 15.9271 7.47441C15.6245 7.44969 15.4507 7.4036 15.319 7.33651C15.0368 7.1927 14.8073 6.96323 14.6635 6.68099C14.5964 6.54931 14.5503 6.37546 14.5256 6.07288C14.5004 5.76446 14.5 5.3683 14.5 4.8V2.5Z"
        stroke={props.stroke || '#282828'}
        fill={props.fill || 'none'}
        className="stroke"
      />
      <rect
        x="8"
        y="9"
        width="8"
        height="0.3"
        stroke={props.stroke || '#282828'}
        className="fill stroke"
      />
      <rect
        x="8"
        y="12"
        width="8"
        height="0.3"
        stroke={props.stroke || '#282828'}
        className="fill stroke"
      />
      <rect
        x="8"
        y="15"
        width="8"
        height="0.3"
        stroke={props.stroke || '#282828'}
        className="fill stroke"
      />
    </g>
  </IconComponent>
);

export default Feed;
