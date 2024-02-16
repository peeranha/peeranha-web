import React from 'react';
import IconComponent, { IconProps } from '../IconComponent';

const AnswerCommentedGraph: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent {...props} fill="none" viewBox="0 0 32 32" size={props.size || [32, 32]}>
    <path
      d="M10.6675 22.5184C10.6675 23.0423 10.8756 23.5447 11.2461 23.9152C11.6165 24.2856 12.119 24.4937 12.6428 24.4937H24.4947L28.4453 28.4443V12.6419C28.4453 12.118 28.2372 11.6156 27.8668 11.2451C27.4963 10.8747 26.9939 10.6666 26.47 10.6666H12.6428C12.119 10.6666 11.6165 10.8747 11.2461 11.2451C10.8756 11.6156 10.6675 12.118 10.6675 12.6419V22.5184Z"
      fill={props.fill || '#E1E1E4'}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M24.888 9.86665V5.92582C24.888 5.29716 24.6383 4.69425 24.1938 4.24972C23.7492 3.80519 23.1463 3.55545 22.5177 3.55545H5.92506C5.2964 3.55545 4.69348 3.80519 4.24895 4.24972C3.80442 4.69425 3.55469 5.29716 3.55469 5.92582V24.8888L8.29543 20.148L9.24327 20.0889"
      fill={props.fill || '#E1E1E4'}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </IconComponent>
);

export default AnswerCommentedGraph;
