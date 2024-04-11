import React from 'react';
import IconComponent, { IconProps } from '../IconComponent';

const DatabaseGraph: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent {...props} fill="none" viewBox="0 0 32 32" size={props.size || [32, 32]}>
    <path
      d="M16 3C9.27125 3 4 6.075 4 10V22C4 25.925 9.27125 29 16 29C22.7288 29 28 25.925 28 22V10C28 6.075 22.7288 3 16 3ZM26 16C26 17.2025 25.015 18.4288 23.2987 19.365C21.3662 20.4188 18.7738 21 16 21C13.2262 21 10.6337 20.4188 8.70125 19.365C6.985 18.4288 6 17.2025 6 16V13.92C8.1325 15.795 11.7787 17 16 17C20.2213 17 23.8675 15.79 26 13.92V16ZM8.70125 6.635C10.6337 5.58125 13.2262 5 16 5C18.7738 5 21.3662 5.58125 23.2987 6.635C25.015 7.57125 26 8.7975 26 10C26 11.2025 25.015 12.4288 23.2987 13.365C21.3662 14.4187 18.7738 15 16 15C13.2262 15 10.6337 14.4187 8.70125 13.365C6.985 12.4288 6 11.2025 6 10C6 8.7975 6.985 7.57125 8.70125 6.635ZM23.2987 25.365C21.3662 26.4188 18.7738 27 16 27C13.2262 27 10.6337 26.4188 8.70125 25.365C6.985 24.4287 6 23.2025 6 22V19.92C8.1325 21.795 11.7787 23 16 23C20.2213 23 23.8675 21.79 26 19.92V22C26 23.2025 25.015 24.4287 23.2987 25.365Z"
      fill={props.fill || '#E1E1E4'}
    />
  </IconComponent>
);

export default DatabaseGraph;