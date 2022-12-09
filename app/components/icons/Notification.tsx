import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Notification: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="notification"
    fill="currentColor"
    viewBox="0 0 18 20"
    size={[18, 20]}
  >
    <g stroke={props.stroke || '#282828'} fill="none">
      <path
        d="m2.753 18.054 13.635-3.653c.502-.135.698-.375.715-.74.015-.341-.138-.779-.367-1.106a8.936 8.936 0 0 0-1.115-1.339c-.195-.188-.765-.68-.829-.74-.526-.491-.82-1.007-1.084-1.988L12.562 4.21C11.674.896 8.781-.125 5.43.773 2.08 1.67.083 4.003.971 7.316l1.146 4.278c.263.981.266 1.575.056 2.264-.026.084-.274.794-.348 1.055a8.936 8.936 0 0 0-.297 1.716c-.034.398.052.854.236 1.142.197.307.487.418.989.283Z"
        fillOpacity=".2"
      />
      <path
        d="M9.656 16.387c.286 1.066-.564 2.222-1.897 2.579-1.334.357-2.647-.218-2.933-1.285"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </IconComponent>
);

export default Notification;
