import { css } from '@emotion/react';
import breakpoints from 'styles/breakpoints';

export const base = css`
  line-height: 20px;
  transition: all 0.3s ease 0s;
  borderradius: 2px;

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
  third: css`
    background: transparent;
    color: var(--color-white);
    fill: var(--color-white);
    border: 1px solid var(--color-white);
  `,
};

export const iconLeft = css`
  display: inline-flex;

  & svg {
    width: 18px;
    height: 18px;
    margin-right: 8px;
  }
`;
