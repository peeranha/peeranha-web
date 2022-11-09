import React from 'react';
import { css } from '@emotion/react';
import IconComponent, { IconProps } from './IconComponent';

const AddSubArticle: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="plus"
    fill="curentColor"
    viewBox="0 0 18 18"
    size={[18, 18]}
  >
    <path
      d="M16.4822 9C16.3668 7.37866 15.6893 5.78984 14.4497 4.55025C11.7161 1.81658 7.28392 1.81658 4.55025 4.55025C1.81658 7.28392 1.81658 11.7161 4.55025 14.4497C5.78984 15.6893 7.37866 16.3668 9 16.4822"
      stroke="#576FED"
      fill="transparent"
    />
    <g clipPath="url(#clip0_1156_1403)">
      <path
        d="M12.5 17.75C15.3995 17.75 17.75 15.3995 17.75 12.5C17.75 9.60051 15.3995 7.25 12.5 7.25C9.60051 7.25 7.25 9.60051 7.25 12.5C7.25 15.3995 9.60051 17.75 12.5 17.75Z"
        fill="#7699FF"
        fillOpacity="0.2"
        stroke="#576FED"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 10.25V14.75"
        stroke="#576FED"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.25 12.5H14.75"
        stroke="#576FED"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1156_1403">
        <rect
          width="18"
          height="18"
          fill="white"
          transform="translate(0.5 0.5)"
        />
      </clipPath>
    </defs>
  </IconComponent>
);

export default AddSubArticle;
