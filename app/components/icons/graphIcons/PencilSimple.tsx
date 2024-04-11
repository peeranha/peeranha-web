import React from 'react';
import IconComponent, { IconProps } from '../IconComponent';

const PencilSimpleGraph: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent {...props} fill="none" viewBox="0 0 32 32" size={props.size || [32, 32]}>
    <path
      d="M28.4138 9.17125L22.8288 3.585C22.643 3.39923 22.4225 3.25187 22.1799 3.15134C21.9372 3.0508 21.6771 2.99905 21.4144 2.99905C21.1517 2.99905 20.8916 3.0508 20.6489 3.15134C20.4062 3.25187 20.1857 3.39923 20 3.585L4.58626 19C4.39973 19.185 4.25185 19.4053 4.15121 19.648C4.05057 19.8907 3.99917 20.151 4.00001 20.4137V26C4.00001 26.5304 4.21072 27.0391 4.5858 27.4142C4.96087 27.7893 5.46958 28 6.00001 28H11.5863C11.849 28.0008 12.1093 27.9494 12.352 27.8488C12.5947 27.7482 12.815 27.6003 13 27.4137L28.4138 12C28.5995 11.8143 28.7469 11.5938 28.8474 11.3511C28.948 11.1084 28.9997 10.8483 28.9997 10.5856C28.9997 10.3229 28.948 10.0628 28.8474 9.82015C28.7469 9.57747 28.5995 9.35697 28.4138 9.17125ZM11.5863 26H6.00001V20.4137L17 9.41375L22.5863 15L11.5863 26ZM24 13.585L18.4138 8L21.4138 5L27 10.585L24 13.585Z"
      fill={props.fill || '#E1E1E4'}
      className="fill"
    />
  </IconComponent>
);

export default PencilSimpleGraph;