import { showPopover } from 'utils/popover';

import messages from 'containers/ViewQuestion/messages';

import { GO_TO_CREATE_COMMUNITY_SCREEN_BUTTON_ID } from './constants';

/* eslint prefer-destructuring: 0 */
export const createCommunityValidator = (rating, translations) => {
  const MIN_RATING_TO_CREATE_COMMUNITY = 2500;

  let message;

  if (rating < MIN_RATING_TO_CREATE_COMMUNITY) {
    message = `${
      translations[messages.notEnoughRating.id]
    } ${MIN_RATING_TO_CREATE_COMMUNITY}`;
  }

  if (message) {
    showPopover(GO_TO_CREATE_COMMUNITY_SCREEN_BUTTON_ID, message);
    return false;
  }

  return true;
};
