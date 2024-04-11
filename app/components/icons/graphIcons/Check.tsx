import React from 'react';
import IconComponent, { IconProps } from '../IconComponent';

const CheckGraph: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent {...props} fill="none" viewBox="0 0 32 32" size={props.size || [32, 32]}>
    <path
      d="M28.7081 9.7075L12.7081 25.7075C12.6152 25.8005 12.5049 25.8742 12.3835 25.9246C12.2621 25.9749 12.132 26.0008 12.0006 26.0008C11.8691 26.0008 11.739 25.9749 11.6176 25.9246C11.4962 25.8742 11.3859 25.8005 11.2931 25.7075L4.29306 18.7075C4.10542 18.5199 4 18.2654 4 18C4 17.7346 4.10542 17.4801 4.29306 17.2925C4.4807 17.1049 4.73519 16.9994 5.00056 16.9994C5.26592 16.9994 5.52042 17.1049 5.70806 17.2925L12.0006 23.5862L27.2931 8.2925C27.4807 8.10486 27.7352 7.99944 28.0006 7.99944C28.2659 7.99944 28.5204 8.10486 28.7081 8.2925C28.8957 8.48014 29.0011 8.73464 29.0011 9C29.0011 9.26536 28.8957 9.51986 28.7081 9.7075Z"
      fill={props.fill || '#E1E1E4'}
    />
  </IconComponent>
);

export default CheckGraph;