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
    <circle cx="4.5" cy="8.5" r="1.5" />
    <circle cx="9.5" cy="8.5" r="1.5" />
    <circle cx="14.5" cy="8.5" r="1.5" />
  </IconComponent>
);

export default AddComment;
