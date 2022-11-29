import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const SendTokens: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="send-tokens"
    fill="currentColor"
    viewBox="0 0 18 17"
    size={[18, 17]}
  >
    <path
      d="M6.5 3.52v3h6.02v2.263l4.044-3.812-4.043-3.812V3.52H6.5ZM10.793 13.42v-3h-6.02V8.16L.728 11.97l4.043 3.812V13.42h6.02Z"
      stroke={props.stroke || '#282828'}
      fill="#FFF"
      fillOpacity=".2"
    />
  </IconComponent>
);

export default SendTokens;
