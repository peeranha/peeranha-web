import { showPopover } from 'utils/popover';
import messages from 'containers/ViewQuestion/messages';

/* eslint prefer-destructuring: 0 */
export const createTagValidator = (profile, translations, buttonId) => {
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
    showPopover(buttonId, message);
    return false;
  }

  return true;
};
