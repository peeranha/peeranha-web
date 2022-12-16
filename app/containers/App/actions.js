import {
  REDIRECT_TO_FEED,
  REDIRECT_TO_DOCUMENTATION,
  REDIRECT_TO_PRELOAD,
} from './constants';

export const redirectToFeed = () => ({
  type: REDIRECT_TO_FEED,
});

export const redirectToDocumentation = (ipfs) => ({
  type: REDIRECT_TO_DOCUMENTATION,
  ipfs,
});

export const redirectToPreload = () => ({
  type: REDIRECT_TO_PRELOAD,
});
