import { showPopover } from 'utils/popover';
import { ApplicationError } from 'utils/errors';

import messages from 'containers/ViewQuestion/messages';

export default ({
  rating,
  translations,
  actor,
  creator,
  buttonId,
  energy,
  minRating,
  minEnergy,
}) => {
  let message;

  if (actor && actor === creator) {
    message = `${translations[messages.creatorCannot.id]}`;
  } else if (rating < minRating) {
    message = `${translations[messages.notEnoughRating.id]} ${minRating}`;
  } else if (energy < minEnergy) {
    message = translations[messages.notEnoughEnergy.id];
  }

  if (message) {
    showPopover(buttonId, message);
    throw new ApplicationError(message);
  }
};
