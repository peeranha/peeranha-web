import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Like: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="like"
    fill="currentColor"
    viewBox="0 0 18 18"
    size={[18, 18]}
  >
    <g
      stroke={props.stroke || '#282828'}
      fill={props.fill || 'none'}
      fillOpacity=".163"
    >
      <path d="M14.961 5.502h-.006l-3.847-.007V3.562C11.108 2.092 9.496.5 8 .5c-.095 0-.158.045-.213.169L4.508 8.206a.28.28 0 0 0-.025.114L4.5 17c0 .167.325.5.485.5h9.067c.944.01 1.755-.67 1.9-1.607l1.506-8.088c.11-.715.014-1.218-.39-1.69-.362-.42-1.19-.623-2.107-.613Z" />
      <path d="M4.34 17.5c.073 0 .169-.113.169-.29V7.79c0-.177-.096-.29-.169-.29H2.006C1.194 7.5.5 8.32.5 9.371v6.258c0 1.05.694 1.871 1.506 1.871H4.34Z" />
    </g>
  </IconComponent>
);

export default Like;
