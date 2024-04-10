import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const TelegramLogo: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent {...props} fill="none" viewBox="0 0 24 24" size={props.size || [24, 24]}>
    <path
      d="M8.25012 12.6436L16.6799 20.0618C16.7774 20.1476 16.8956 20.2066 17.0228 20.2331C17.15 20.2595 17.2819 20.2524 17.4055 20.2126C17.5292 20.1727 17.6403 20.1014 17.7281 20.0056C17.8159 19.9099 17.8774 19.7929 17.9064 19.6663L21.4327 4.27886C21.4632 4.14582 21.4568 4.00698 21.4142 3.87731C21.3716 3.74763 21.2944 3.63204 21.191 3.54298C21.0876 3.45392 20.9618 3.39478 20.8272 3.37192C20.6927 3.34906 20.5544 3.36336 20.4274 3.41326L3.12517 10.2106C2.97438 10.2698 2.84683 10.3763 2.76159 10.5141C2.67636 10.6518 2.63803 10.8135 2.65235 10.9749C2.66666 11.1363 2.73285 11.2887 2.841 11.4093C2.94915 11.5299 3.09346 11.6123 3.25233 11.6441L8.25012 12.6436Z"
      stroke={props.stroke || 'rgba(40, 40, 40, 1)'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.25 12.6437L21.0105 3.42773"
      stroke={props.stroke || 'rgba(40, 40, 40, 1)'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.46 16.3494L9.53033 19.2791C9.42544 19.384 9.2918 19.4554 9.14632 19.4843C9.00083 19.5133 8.85003 19.4984 8.71299 19.4416C8.57594 19.3849 8.45881 19.2888 8.3764 19.1654C8.29399 19.0421 8.25 18.8971 8.25 18.7487V12.6445"
      stroke={props.stroke || 'rgba(40, 40, 40, 1)'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </IconComponent>
);

export default TelegramLogo;
