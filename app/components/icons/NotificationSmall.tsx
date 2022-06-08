import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const NotificationSmall: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="notification-small"
    fill="curentColor"
    viewBox="0 0 13 15"
    size={[13, 15]}
  >
    <g stroke={props.stroke || '#282828'} fill="none">
      <path
        d="m1.952 12.905 9.848-2.639c.304-.081.404-.203.413-.406.01-.213-.09-.5-.24-.713a6.316 6.316 0 0 0-.788-.947c-.137-.132-.547-.486-.597-.532-.4-.374-.625-.769-.822-1.502l-.827-3.09C8.32.77 6.312.062 3.957.693 1.603 1.323.217 2.942.836 5.248l.827 3.09c.197.732.199 1.187.04 1.71-.02.066-.199.577-.251.76a6.316 6.316 0 0 0-.21 1.214c-.022.26.034.558.15.738.109.17.256.227.56.145Z"
        fillOpacity=".2"
        fill="#FFF"
      />
      <path
        d="M6.974 11.835c.206.77-.407 1.605-1.37 1.863-.964.258-1.912-.158-2.118-.928"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </IconComponent>
);

export default NotificationSmall;
