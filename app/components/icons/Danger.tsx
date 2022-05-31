import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Danger: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="danger"
    fill="curentColor"
    viewBox="0 0 26 22"
    size={[26, 22]}
  >
    <g fill="none" fillRule="evenodd">
      <path
        fill="#282828"
        d="M25.771 19.583L14.364.783A1.595 1.595 0 0 0 13 .016c-.558 0-1.076.29-1.364.765L.229 19.582a1.575 1.575 0 0 0-.023 1.597c.282.497.812.804 1.387.804h22.814c.574 0 1.104-.307 1.387-.804a1.575 1.575 0 0 0-.023-1.596z"
      />
      <path
        fill="#FFF"
        fill-rule="nonzero"
        d="M22.494 20H3.506a.51.51 0 0 1-.437-.241.47.47 0 0 1-.003-.485l9.483-16.028a.51.51 0 0 1 .44-.246.51.51 0 0 1 .44.246l9.505 16.028a.47.47 0 0 1-.003.484.51.51 0 0 1-.437.242zM5 19h16L12.99 5 5 19z"
      />
      <path
        fill="#FFF"
        fill-rule="nonzero"
        d="M14.5 16.5c0 .799-.686 1.5-1.49 1.5-.863 0-1.51-.701-1.51-1.5 0-.818.647-1.5 1.51-1.5.804 0 1.49.682 1.49 1.5zM12 9h2v5h-2V9z"
      />
    </g>
  </IconComponent>
);

export default Danger;
