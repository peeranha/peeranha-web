import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Tick: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent {...props} id="tick" fill="#fff" viewBox="0 0 24 24" size={24}>
    <path d="M19.24 5.7C19.6266 5.3134 20.2534 5.3134 20.64 5.7C21.0266 6.0866 21.0266 6.7134 20.64 7.1L9.30711 18.4329C8.91658 18.8234 8.28342 18.8234 7.89289 18.4329L3.7 14.24C3.3134 13.8534 3.3134 13.2266 3.7 12.84C4.0866 12.4534 4.7134 12.4534 5.1 12.84L8.6 16.34L19.24 5.7Z" />
  </IconComponent>
);

export default Tick;
