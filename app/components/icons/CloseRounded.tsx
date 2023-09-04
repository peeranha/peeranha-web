import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

type CloseRoundedProps = {
  circleFill: string;
  fillOpacity?: string;
};

const CloseRounded: React.FC<IconProps & CloseRoundedProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="close-rounded"
    fill="currentColor"
    viewBox="0 0 18 18"
    size={props.size || [18, 18]}
  >
    <circle
      cx="9"
      cy="9"
      r="7.5"
      stroke={props.stroke || '#282828'}
      fill={props.circleFill || '#ffffff'}
      fillOpacity={props.fillOpacity || 0.2}
    />
    <rect
      x="12.017"
      y="5.22876"
      width="1.06667"
      height="9.6"
      transform="rotate(45 12.017 5.22876)"
      fill={props.stroke || '#282828'}
    />
    <rect
      x="12.7712"
      y="12.017"
      width="1.06667"
      height="9.6"
      transform="rotate(135 12.7712 12.017)"
      fill={props.stroke || '#282828'}
    />
  </IconComponent>
);

export default CloseRounded;
