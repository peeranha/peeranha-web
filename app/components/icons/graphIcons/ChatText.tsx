import React from 'react';
import IconComponent, { IconProps } from '../IconComponent';

const ChatTextGraph: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent {...props} fill="none" viewBox="0 0 32 32" size={props.size || [32, 32]}>
    <path
      d="M27 6H5.00003C4.4696 6 3.96089 6.21071 3.58582 6.58579C3.21075 6.96086 3.00003 7.46957 3.00003 8V28C2.99778 28.3812 3.10554 28.755 3.31041 29.0765C3.51528 29.398 3.80855 29.6535 4.15504 29.8125C4.41981 29.9354 4.70812 29.9994 5.00003 30C5.46954 29.9989 5.92347 29.8315 6.28128 29.5275C6.28725 29.5236 6.29271 29.519 6.29753 29.5138L10.3125 26H27C27.5305 26 28.0392 25.7893 28.4142 25.4142C28.7893 25.0391 29 24.5304 29 24V8C29 7.46957 28.7893 6.96086 28.4142 6.58579C28.0392 6.21071 27.5305 6 27 6ZM27 24H10.3125C9.84156 23.9998 9.38562 24.1658 9.02503 24.4688L9.01004 24.4825L5.00003 28V8H27V24ZM11 14C11 13.7348 11.1054 13.4804 11.2929 13.2929C11.4805 13.1054 11.7348 13 12 13H20C20.2653 13 20.5196 13.1054 20.7071 13.2929C20.8947 13.4804 21 13.7348 21 14C21 14.2652 20.8947 14.5196 20.7071 14.7071C20.5196 14.8946 20.2653 15 20 15H12C11.7348 15 11.4805 14.8946 11.2929 14.7071C11.1054 14.5196 11 14.2652 11 14ZM11 18C11 17.7348 11.1054 17.4804 11.2929 17.2929C11.4805 17.1054 11.7348 17 12 17H20C20.2653 17 20.5196 17.1054 20.7071 17.2929C20.8947 17.4804 21 17.7348 21 18C21 18.2652 20.8947 18.5196 20.7071 18.7071C20.5196 18.8946 20.2653 19 20 19H12C11.7348 19 11.4805 18.8946 11.2929 18.7071C11.1054 18.5196 11 18.2652 11 18Z"
      fill={props.fill || '#E1E1E4'}
    />
  </IconComponent>
);

export default ChatTextGraph;
