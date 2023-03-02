import { showPopover } from 'utils/popover';
import { ApplicationError } from 'utils/errors';
import { t } from 'i18next';

export default ({
  rating,
  actor,
  creator,
  buttonId,
  minRating,
  isGlobalAdmin,
  isCommunityAdmin,
}) => {
  let message;

  if (actor && actor === creator) {
    message = t('post.creatorCannot');
  } else if (rating < minRating && !isGlobalAdmin && !isCommunityAdmin) {
    message = `${t('post.notEnoughRating')} ${minRating}`;
  }

  if (message) {
    showPopover(buttonId, message);
    throw new ApplicationError(message);
  }
};
