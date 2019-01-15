import { translationMessages } from 'i18n';
import { showPopover } from 'utils/popover';
import messages from 'containers/ViewQuestion/messages';

import suggestedCommunitiesMessages from './messages';

/* eslint prefer-destructuring: 0 */
export const upVoteValidator = (
  profile,
  locale,
  selectedAccount,
  activeCommunity,
  buttonId,
) => {
  const MIN_RATING_TO_UPVOTE = 100;

  let message;

  if (selectedAccount === activeCommunity.creator) {
    message = `${
      translationMessages[locale][
        suggestedCommunitiesMessages.creatorCannotUpvoteOwnComm.id
      ]
    }`;
  } else if (activeCommunity.voters.filter(x => x === selectedAccount)[0]) {
    message = `${
      translationMessages[locale][
        suggestedCommunitiesMessages.youHaveAlreadyVoted.id
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
  activeCommunity,
  buttonId,
) => {
  const MIN_RATING_TO_DOWNVOTE = 100;

  let message;

  if (activeCommunity.voters.filter(x => x === selectedAccount)[0]) {
    message = `${
      translationMessages[locale][
        suggestedCommunitiesMessages.youHaveAlreadyVoted.id
      ]
    }`;
  } else if (profile.rating < MIN_RATING_TO_DOWNVOTE) {
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
