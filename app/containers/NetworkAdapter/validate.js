import { showPopover } from 'utils/popover';
import { ApplicationError } from 'utils/errors';

import messages from 'containers/ViewQuestion/messages';

export default ({
  rating,
  translations,
  actor,
  creator,
  buttonId,
  minRating,
  isGlobalAdmin,
}) => {
  let message;

  if (actor && actor === creator) {
    message = `${translations[messages.creatorCannot.id]}`;
  } else if (rating < minRating && !isGlobalAdmin) {
    message = `${translations[messages.notEnoughRating.id]} ${minRating}`;
  }

  if (message) {
    showPopover(buttonId, message);
    throw new ApplicationError(message);
  }
};
