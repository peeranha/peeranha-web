import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const MediumSupport: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="medium-support"
    fill="curentColor"
    viewBox="0 0 26 22"
    size={[26, 22]}
  >
    <path
      fill={props.fill || '#282828'}
      fillRule="evenodd"
      d="M24.033 19.124L26 21.008v.063h-9.978v-.063l2.003-1.884a.76.76 0 0 0 .267-.724V6.35c0-.508 0-1.196.089-1.786l-6.73 16.748h-.08L4.601 5.904c-.15-.384-.195-.41-.293-.67v10.102a3.52 3.52 0 0 0 .33 1.975l2.803 3.697v.063H0v-.063l2.804-3.706c.296-.61.41-1.292.33-1.966V4.171a2.166 2.166 0 0 0-.464-1.527L.685.062V0h7.121l5.964 13.05L19.022 0h6.97v.062l-1.96 2.189a.77.77 0 0 0-.302.75v15.4a.715.715 0 0 0 .303.723"
    />
  </IconComponent>
);

export default MediumSupport;
