import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

type AchievementsProps = {
  circleFill?: string;
};

const Achivements: React.FC<IconProps & AchievementsProps> = (
  props,
): JSX.Element => (
  <IconComponent
    {...props}
    fill="currentColor"
    viewBox="0 0 18 18"
    size={props.size || [18, 18]}
  >
    <path
      d="M5 12V17L9 15L13 17V12"
      stroke={props.stroke || '#282828'}
      fill="none"
    />
    <circle
      cx="9"
      cy="7"
      r="6"
      fill={props.circleFill || 'none'}
      fillOpacity="0.2"
      stroke={props.stroke || '#282828'}
    />
  </IconComponent>
);

export default Achivements;
