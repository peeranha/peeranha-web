import React from 'react';
import { css, keyframes } from '@emotion/react';

type SpinnerProps = {
  className?: string;
  thema?: 'dark' | 'light';
  size?: number;
};

const svgAnimation = keyframes(
  css`
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  `,
);

const circleAnimation = keyframes(
  css`
    0% {
      stroke-dashoffset: 270;
      transform: rotate(0);
    }
    50% {
      stroke-dashoffset: 80;
      transform: rotate(45deg);
    }
    100% {
      stroke-dashoffset: 270;
      transform: rotate(360deg);
    }
  `,
);

const Spinner: React.FC<SpinnerProps> = ({
  thema = 'dark',
  className,
  size = 18,
}): JSX.Element => {
  const getStroke = (color: string) =>
    color === 'light' ? `#FFFFFF` : `#000000`;

  return (
    <div
      css={css`
        flex-shrink: 0;
        position: relative;
        width: ${size}px;
        height: ${size}px;

        & svg {
          position: absolute;
          display: block;
          fill: transparent;
          stroke-width: 6px;
          stroke: rgba(0, 0, 0, 0.06);
        }
      `}
      className={className}
    >
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" />
      </svg>
      <svg
        css={css`
          animation: 2s ease-in-out infinite ${svgAnimation};

          & circle {
            animation: 2s linear infinite both ${circleAnimation};
            stroke-dasharray: 280;
            stroke-dashoffset: 280;
            transform-origin: 50% 50%;
            stroke: ${getStroke(thema)};
          }
        `}
        viewBox="0 0 100 100"
      >
        <circle cx="50" cy="50" r="40" />
      </svg>
    </div>
  );
};

export default Spinner;
