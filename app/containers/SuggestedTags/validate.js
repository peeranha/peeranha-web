import { translationMessages } from 'i18n';
import { showPopover } from 'utils/popover';
import messages from 'containers/ViewQuestion/messages';

import suggestedTagsMessages from './messages';

/* eslint prefer-destructuring: 0 */
export const upVoteValidator = (
  profile,
  locale,
  selectedAccount,
  activeTag,
  buttonId,
) => {
  const MIN_RATING_TO_UPVOTE = 35;

  let message;

  if (selectedAccount === activeTag.creator) {
    message = `${
      translationMessages[locale][
        suggestedTagsMessages.creatorCannotUpvoteOwnComm.id
      ]
    }`;
  } else if (profile.rating < MIN_RATING_TO_UPVOTE) {
    message = `${
      translationMessages[locale][messages.notEnoughRating.id]
    } ${MIN_RATING_TO_UPVOTE}`;
  }

  if (message) {
    showPopover(buttonId, message);
    return false;
  }

  return true;
};

/* eslint prefer-destructuring: 0 */
export const downVoteValidator = (
  profile,
  locale,
  selectedAccount,
  activeTag,
  buttonId,
) => {
  const MIN_RATING_TO_DOWNVOTE = 35;

  let message;

  if (profile.rating < MIN_RATING_TO_DOWNVOTE) {
    message = `${
      translationMessages[locale][messages.notEnoughRating.id]
    } ${MIN_RATING_TO_DOWNVOTE}`;
  }

  if (message) {
    showPopover(buttonId, message);
    return false;
  }

  return true;
};
