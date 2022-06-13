import { css, useTheme } from '@emotion/react';
import breakpoints from 'styles/breakpoints';

export const base = css`
  line-height: 20px;
  transition: all 0.3s ease 0s;

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  padding: 10px 18px;
  text-decoration: none;

  ${breakpoints.md} {
    width: max-content;
  }
`;

export const variants = {
  primary: css`
    background: var(--color-button-primary);
    color: var(--color-white);
    fill: var(--color-white);
    &:hover {
      opacity: 0.85;
    }
    &:active {
      opacity: 0.85;
    }
  `,
  secondary: css`
    background: var(--color-white);
    color: var(--color-button-secondary);
    fill: var(--color-button-secondary);
    border: 1px solid var(--color-button-secondary);
    &:hover {
      background: var(--color-button-secondary);
      color: var(--color-white);
      fill: var(--color-white);
    }
    &:active {
      background: var(--color-button-secondary);
      color: var(--color-white);
      fill: var(--color-white);
    }
  `,
  link: css`
    background: none;
    color: var(--color-stroke-icon);
    fill: var(--color-stroke-icon);
    line-height: 18px;
    font-size: 16px;
    padding: 2px;
  `,
};

export const iconLeft = css`
  display: inline-flex;

  & svg {
    width: 14px;
    height: 14px;
    margin-right: 8px;
    margin-top: 2px;

    :last-child {
      margin-right: 0;
    }
  }
`;
