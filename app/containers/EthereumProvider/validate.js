import { showPopover } from 'utils/popover';
import { ApplicationError } from 'utils/errors';

export default ({
  rating,
  translations,
  actor,
  creator,
  buttonId,
  minRating,
}) => {
  let message;

  if (actor && actor === creator) {
    message = translations('post.creatorCannot');
  } else if (rating < minRating) {
    message = `${translations('post.creatorCannot')} ${minRating}`;
  }

  if (message) {
    showPopover(buttonId, message);
    throw new ApplicationError(message);
  }
};
