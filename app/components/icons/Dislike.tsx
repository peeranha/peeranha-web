import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Dislike: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="dislike"
    fill="currentColor"
    viewBox="0 0 18 18"
    size={[18, 18]}
  >
    <g stroke={props.stroke || '#282828'} fill="none">
      <path d="M14.961 12.498h-.006l-3.847.007v1.933c0 1.47-1.612 3.062-3.108 3.062-.095 0-.158-.045-.213-.169L4.508 9.794a.28.28 0 0 1-.025-.114L4.5 1c0-.167.325-.5.485-.5h9.067c.944-.01 1.755.67 1.9 1.607l1.506 8.088c.11.715.014 1.218-.39 1.69-.362.42-1.19.623-2.107.613Z" />
      <path d="M4.34.5c.073 0 .169.113.169.29v9.42c0 .177-.096.29-.169.29H2.006C1.194 10.5.5 9.68.5 8.629V2.37C.5 1.321 1.194.5 2.006.5H4.34Z" />
    </g>
  </IconComponent>
);

export default Dislike;
