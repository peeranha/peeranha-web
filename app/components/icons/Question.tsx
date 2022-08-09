import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Question: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    id="question"
    fill="currentColor"
    viewBox="0 0 18 18"
    size={props.size || [18, 18]}
  >
    <g fill="none">
      <circle
        cx="9"
        cy="9"
        r="8.5"
        fill={props.fill || 'none'}
        stroke={props.stroke || '#282828'}
      />
      <path
        stroke="none"
        fill={props.stroke || '#282828'}
        d="M9 4.235c-1.46 0-2.647 1.224-2.647 2.73 0 .309.244.56.544.56.3 0 .544-.251.544-.56 0-.887.7-1.608 1.559-1.608.86 0 1.559.721 1.559 1.607s-.7 1.607-1.56 1.607c-.3 0-.543.251-.543.561v1.954c0 .31.243.561.544.561.3 0 .544-.251.544-.56V9.633c1.2-.259 2.103-1.358 2.103-2.67 0-1.505-1.187-2.729-2.647-2.729M9 12.706a.53.53 0 1 0 0 1.06.53.53 0 0 0 0-1.06"
      />
    </g>
  </IconComponent>
);

export default Question;
