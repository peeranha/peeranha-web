import { css } from '@emotion/react';

export const cookieConsent = css`
  background: #f0f8ff;
  z-index: 999;
`;

export const cookieConsentAnimation = css`
  animation: animation 1s forwards;

  @keyframes animation {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(100%);
      display: none;
    }
  }
`;
