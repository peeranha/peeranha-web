import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const EditSmall: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="edit-small"
    fill="currentColor"
    viewBox="0 0 13 13"
    size={[13, 13]}
  >
    <path
      fill={props.fill || '#282828'}
      fillOpacity=".2"
      stroke={props.stroke || '#282828'}
      d="M1.52 10.949a.5.5 0 0 0 .527.536l2.675-.155a.5.5 0 0 0 .327-.147l6.22-6.29a.5.5 0 0 0-.002-.704L8.821 1.737l-.001-.001a.5.5 0 0 0-.707 0l-6.25 6.266a.5.5 0 0 0-.145.315l-.199 2.632z"
    />
    <path
      stroke="none"
      fill={props.fill || '#282828'}
      d="M6.707 3l3.536 3.535-.707.707L6 3.707z"
    />
  </IconComponent>
);

export default EditSmall;
