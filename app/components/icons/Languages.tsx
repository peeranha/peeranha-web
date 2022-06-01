import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Languages: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="languages"
    fill="curentColor"
    viewBox="0 0 18 18"
    size={[18, 18]}
  >
    <g fill="none" fill-rule="nonzero">
      <circle
        cx="9.5"
        cy="8.5"
        r="7"
        fill={props.fill || '#FFF'}
        stroke={props.stroke || '#282828'}
      />
      <path
        fill={props.fill || '#FFF'}
        stroke={props.stroke || '#282828'}
        d="M8.487 1.573a7.002 7.002 0 0 0 0 13.854C6.679 14.031 5.5 11.424 5.5 8.5c0-2.924 1.18-5.531 2.987-6.927zM10.513 1.573a7.002 7.002 0 0 1 0 13.854C12.321 14.031 13.5 11.424 13.5 8.5c0-2.924-1.18-5.531-2.987-6.927z"
      />
      <path fill={props.fill || '#282828'} d="M9 1h1v15H9z" />
      <path
        fill={props.fill || '#282828'}
        d="M2 9V8h15v1zM3 6V5h13v1zM3 12v-1h13v1z"
      />
    </g>
  </IconComponent>
);

export default Languages;
