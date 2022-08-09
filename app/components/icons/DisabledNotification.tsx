import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const DisabledNotification: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="notification"
    fill="currentColor"
    viewBox="0 0 18 20"
    size={props.size || [18, 20]}
  >
    <g stroke={props.stroke || '#282828'} fill="none">
      <path
        className="stroke"
        d="M1.44178573,16.5 L15.5582143,16.5 C16.0778678,16.5 16.3289607,16.3185773 16.4397277,15.9705039 C16.5432432,15.6452174 16.5083156,15.1824002 16.3722356,14.8069025 C16.1368496,14.1573481 15.9024374,13.6624198 15.6409934,13.2253511 C15.5019641,12.992929 15.078632,12.371105 15.0320714,12.2964374 C14.6509387,11.6852289 14.5,11.111387 14.5,10.0952389 L14.5,5.66666667 C14.5,2.23569963 11.9694108,0.5 8.5,0.5 C5.0305892,0.5 2.5,2.23569963 2.5,5.66666667 L2.5,10.0952389 C2.5,11.111387 2.34906126,11.6852289 1.96792864,12.2964374 C1.92136797,12.371105 1.49803591,12.992929 1.35900659,13.2253511 C1.09756263,13.6624198 0.863150393,14.1573481 0.627761669,14.80691 C0.491684435,15.1824002 0.45675679,15.6452174 0.560272278,15.9705039 C0.671039253,16.3185773 0.922132243,16.5 1.44178573,16.5 Z"
        id="Stroke-1"
      />
      <path
        className="stroke"
        d="M11,17 C11,18.1040778 9.8806899,19 8.5,19 C7.1193101,19 6,18.1043148 6,17"
        id="Stroke-3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </IconComponent>
);

export default DisabledNotification;
