import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

type CloseRoundedProps = {
  circleFill: string;
  fillOpacity: string;
};

const CloseRounded: React.FC<IconProps & CloseRoundedProps> = (
  props,
): JSX.Element => (
  <IconComponent
    {...props}
    id="close-rounded"
    fill="currentColor"
    viewBox="0 0 15 15"
    size={[15, 15]}
  >
    <circle
      cx="7.5"
      cy="7.5"
      r="7"
      fill={props.circleFill || '#FFF'}
      fillOpacity={props.fillOpacity || '.2'}
      stroke={props.stroke || '#282828'}
    />
    <g fill={props.fill || '#282828'}>
      <path d="m10.328 3.964.708.708-6.364 6.364-.708-.708z" />
      <path d="m11.036 10.328-.708.708-6.364-6.364.708-.708z" />
    </g>
  </IconComponent>
);

export default CloseRounded;
