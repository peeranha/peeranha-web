import React from 'react';
import IconComponent, { IconProps } from '../IconComponent';

const CaretUpGraph: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent {...props} fill="none" viewBox="0 0 32 32" size={props.size || [32, 32]}>
    <path
      d="M26.7081 20.7075C26.6152 20.8005 26.5049 20.8742 26.3835 20.9246C26.2621 20.9749 26.132 21.0008 26.0006 21.0008C25.8691 21.0008 25.739 20.9749 25.6176 20.9246C25.4962 20.8742 25.3859 20.8005 25.2931 20.7075L16.0006 11.4137L6.70806 20.7075C6.52042 20.8951 6.26592 21.0006 6.00056 21.0006C5.73519 21.0006 5.4807 20.8951 5.29306 20.7075C5.10542 20.5199 5 20.2654 5 20C5 19.7346 5.10542 19.4801 5.29306 19.2925L15.2931 9.2925C15.3859 9.19952 15.4962 9.12576 15.6176 9.07544C15.739 9.02512 15.8691 8.99921 16.0006 8.99921C16.132 8.99921 16.2621 9.02512 16.3835 9.07544C16.5049 9.12576 16.6152 9.19952 16.7081 9.2925L26.7081 19.2925C26.801 19.3854 26.8748 19.4957 26.9251 19.6171C26.9754 19.7385 27.0013 19.8686 27.0013 20C27.0013 20.1314 26.9754 20.2615 26.9251 20.3829C26.8748 20.5043 26.801 20.6146 26.7081 20.7075Z"
      fill={props.fill || '#E1E1E4'}
    />
  </IconComponent>
);

export default CaretUpGraph;