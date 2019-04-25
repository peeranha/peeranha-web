import { showPopover } from 'utils/popover';

import messages from 'containers/ViewQuestion/messages';

import { GO_TO_CREATE_TAG_SCREEN_BUTTON_ID } from './constants';

/* eslint prefer-destructuring: 0 */
export const createTagValidator = (profile, translations) => {
  const MIN_RATING_TO_CREATE_TAG = 500;
  const MIN_MOD_POINTS = 2;

  let message;

  if (profile.rating < MIN_RATING_TO_CREATE_TAG) {
    message = `${
      translations[messages.notEnoughRating.id]
    } ${MIN_RATING_TO_CREATE_TAG}`;
  } else if (profile.moderation_points < MIN_MOD_POINTS) {
    message = `${
      translations[messages.notEnoughModPoints.id]
    } ${MIN_MOD_POINTS}`;
  }

  if (message) {
    showPopover(GO_TO_CREATE_TAG_SCREEN_BUTTON_ID, message);
    return false;
  }

  return true;
};
