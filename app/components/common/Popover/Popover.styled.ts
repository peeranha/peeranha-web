import { keyframes } from '@emotion/react';

const popover = keyframes`
  from: {
    opacity: 0;
  }
  to: {
    opacity: 1;
  }
`;

export const root = {
  animation: `${popover} 0.15s ease-in`,
  'will-change': 'top, left',
};
