import { css } from '@emotion/react';

export const cookieConsent = css`
  background: #f0f8ff;
  z-index: 999;
`;

export const cookieImage = css`
  width: 70px;

  @media only screen and (max-width: 450px) {
    display: none;
  }
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
