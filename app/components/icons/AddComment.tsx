import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const AddComment: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="add-comment"
    fill="currentColor"
    viewBox="0 0 18 18"
    size={[18, 18]}
  >
    <g transform="translate(3 7)">
      <circle cx="1.5" cy="1.5" r="1.5" />
      <circle cx="6.5" cy="1.5" r="1.5" />
      <circle cx="11.5" cy="1.5" r="1.5" />
    </g>
  </IconComponent>
);

export default AddComment;
