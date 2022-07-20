import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

type AchievementsProps = {
  circleFill?: string;
};

const Achivements: React.FC<IconProps & AchievementsProps> = ({
  size,
  stroke,
  circleFill,
}): JSX.Element => (
  <IconComponent
    id="achievements"
    fill="currentColor"
    viewBox="0 0 16 16"
    size={size || [16, 16]}
  >
    <circle
      stroke={stroke || '#282828'}
      strokeWidth="1.2px"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      cx="8"
      cy="5"
      r="4.5"
      fill={circleFill || 'none'}
    />
    <polyline
      stroke={stroke || '#282828'}
      strokeWidth="1.2px"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      points="11.5,10.5 11.5,15.5 8,13.5 4.5,15.5 4.5,10.5 "
      fill="none"
    />
  </IconComponent>
);

export default Achivements;
