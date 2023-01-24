import { showPopover } from 'utils/popover';
import { ApplicationError } from 'utils/errors';

export default ({
  rating,
  actor,
  creator,
  buttonId,
  energy,
  minRating,
  minEnergy,
}) => {
  let message;

  if (actor && actor === creator) {
    message = '';
  } else if (rating < minRating) {
    message = '';
  } else if (energy < minEnergy) {
    message = '';
  }

  if (message) {
    showPopover(buttonId, message);
    throw new ApplicationError(message);
  }
};
