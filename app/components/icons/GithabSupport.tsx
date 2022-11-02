import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const GithabSupport: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="githab-support."
    fill="curentColor"
    viewBox="0 0 32 32"
    size={[32, 32]}
  >
    <path
      fill={props.fill || '#282828'}
      d="M16 0C7.158 0 0 7.164 0 16.006c0 7.086 4.576 13.065 10.938 15.186.802.14 1.106-.34 1.106-.76 0-.383-.024-1.64-.024-2.977-4.017.735-5.062-.985-5.378-1.884-.182-.462-.96-1.884-1.647-2.26-.553-.298-1.355-1.04-.012-1.058 1.258-.024 2.157 1.155 2.455 1.635 1.44 2.424 3.743 1.744 4.66 1.318.14-1.033.56-1.738 1.022-2.139-3.561-.4-7.28-1.78-7.28-7.9 0-1.744.62-3.184 1.64-4.302-.164-.4-.723-2.042.158-4.241 0 0 1.343-.42 4.406 1.64a14.834 14.834 0 0 1 3.999-.54c1.355 0 2.716.182 3.998.54 3.063-2.078 4.4-1.64 4.4-1.64.88 2.2.316 3.84.158 4.241 1.02 1.118 1.646 2.54 1.646 4.302 0 6.138-3.749 7.5-7.31 7.9.583.505 1.082 1.465 1.082 2.966 0 2.139-.019 3.858-.019 4.4 0 .418.304.917 1.1.759C27.424 29.07 32 23.067 32 16.006 32 7.164 24.842 0 16 0"
    />
  </IconComponent>
);

export default GithabSupport;
