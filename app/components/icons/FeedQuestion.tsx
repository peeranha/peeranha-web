import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const FeedQuestion: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="feed-question"
    fill="curentColor"
    viewBox="0 0 43 43"
    size={[43, 43]}
  >
    <path
      d="M18.505 27.071c-.403-2.802.52-4.687 2.85-7.213.15-.163.657-.707.736-.792.278-.3.486-.532.674-.754.861-1.016 1.255-1.799 1.255-2.632 0-1.812-.949-2.98-2.567-2.98-1.31 0-2.659.802-3.923 2.196l-.338.373-3.283-3.026.309-.365C16.484 9.19 19.078 7.5 21.8 7.5c4.58 0 7.7 3.207 7.7 7.86 0 2.206-.832 3.527-3.157 5.937l-.142.147c-2.22 2.303-2.92 3.51-2.704 5.502l.06.554h-4.99l-.062-.429ZM18.5 33c0-1.423 1.076-2.5 2.487-2.5 1.413 0 2.513 1.08 2.513 2.5s-1.1 2.5-2.513 2.5c-1.41 0-2.487-1.077-2.487-2.5Z"
      stroke={props.stroke || '#282828'}
      fill="#282828"
    />
    <path
      d="M17.505 26.071c-.403-2.802.52-4.687 2.85-7.213.15-.163.657-.707.736-.792.278-.3.486-.532.674-.754.861-1.016 1.255-1.799 1.255-2.632 0-1.812-.949-2.98-2.567-2.98-1.31 0-2.659.802-3.923 2.196l-.338.373-3.283-3.026.309-.365C15.484 8.19 18.078 6.5 20.8 6.5c4.58 0 7.7 3.207 7.7 7.86 0 2.206-.832 3.527-3.157 5.937l-.142.147c-2.22 2.303-2.92 3.51-2.704 5.502l.06.554h-4.99l-.062-.429Z"
      stroke={props.stroke || '#282828'}
      fill="#FFF"
    />
    <path
      d="M17.5 32c0-1.423 1.076-2.5 2.487-2.5 1.413 0 2.513 1.08 2.513 2.5s-1.1 2.5-2.513 2.5c-1.41 0-2.487-1.077-2.487-2.5Z"
      stroke={props.stroke || '#282828'}
      fill="#FFF"
    />
  </IconComponent>
);

export default FeedQuestion;
