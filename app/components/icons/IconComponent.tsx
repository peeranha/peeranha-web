import { css } from '@emotion/react';
import React from 'react';

type IconComponentProps = {
  id?: string;
  viewBox?: string;
  fill?: string;
  stroke?: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
  children?: JSX.Element | React.ReactNode;
};

export type IconProps = Omit<IconComponentProps, 'viewBox'>;

const IconComponent: React.FC<IconComponentProps> = ({
  className,
  children,
  onClick,
  style,
  size = 18,
  fill = 'currentColor',
  viewBox = '0 0 18 18',
}): JSX.Element => {
  return (
    <svg
      onClick={onClick}
      viewBox={viewBox}
      fill={fill}
      style={style}
      css={css`
        width: ${size}px;
        height: ${size}px;
        display: inline-block;
        flex-shrink: 0;
        user-select: none;
      `}
      className={className}
    >
      {children}
    </svg>
  );
};

export default IconComponent;
