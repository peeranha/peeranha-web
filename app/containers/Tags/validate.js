import { translationMessages } from 'i18n';
import { showPopover } from 'utils/popover';
import messages from 'containers/ViewQuestion/messages';

import tagsMessages from './messages';

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
      translationMessages[locale][tagsMessages.creatorCannotUpvoteOwnComm.id]
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
