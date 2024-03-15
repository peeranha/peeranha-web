import React from 'react';
import IconComponent, { IconProps } from '../IconComponent';

const UpvoteCanceledGraph: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent {...props} fill="none" viewBox="0 0 32 32" size={props.size || [32, 32]}>
    <path
      d="M9.19478 13.6501L13.6162 3.70181C14.4957 3.70181 15.3392 4.05119 15.9611 4.67307C16.583 5.29496 16.9323 6.13842 16.9323 7.0179V11.4394H23.1887C23.5091 11.4357 23.8265 11.5018 24.1189 11.633C24.4113 11.7643 24.6717 11.9575 24.8819 12.1993C25.0922 12.4411 25.2474 12.7258 25.3368 13.0336C25.4261 13.3413 25.454 13.7803 25.4059 14.0972V13.7069M9.19478 13.6501V25.8091M9.19478 13.6501H5.87869C5.29237 13.6501 4.73007 13.883 4.31548 14.2976C3.90088 14.7122 3.66797 15.2745 3.66797 15.8608V23.5983C3.66797 24.1847 3.90088 24.747 4.31548 25.1616C4.73007 25.5762 5.29237 25.8091 5.87869 25.8091H9.19478M9.19478 25.8091H14.2242"
      stroke={props.stroke || '#E1E1E4'}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="22.2222"
      cy="22.2221"
      r="5.32222"
      stroke={props.stroke || '#E1E1E4'}
      strokeWidth="1.8"
    />
    <path
      d="M24.888 18.6667L19.5547 25.7778"
      stroke={props.stroke || '#E1E1E4'}
      strokeWidth="1.8"
    />
  </IconComponent>
);

export default UpvoteCanceledGraph;
