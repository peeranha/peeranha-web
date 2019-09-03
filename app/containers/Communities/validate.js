import { showPopover } from 'utils/popover';

import messages from 'containers/ViewQuestion/messages';

/* eslint prefer-destructuring: 0 */
export const createCommunityValidator = (profile, translations, buttonId) => {
  const MIN_RATING_TO_CREATE_COMMUNITY = 2500;
  const MIN_MOD_POINTS = 5;

  let message;

  if (profile.rating < MIN_RATING_TO_CREATE_COMMUNITY) {
    message = `${
      translations[messages.notEnoughRating.id]
    } ${MIN_RATING_TO_CREATE_COMMUNITY}`;
  } else if (profile.moderation_points < MIN_MOD_POINTS) {
    message = `${
      translations[messages.notEnoughModPoints.id]
    } ${MIN_MOD_POINTS}`;
  }

  if (message) {
    showPopover(buttonId, message);
    return false;
  }

  return true;
};
