import { isSuiBlockchain } from 'utils/constants';
import { showPopover } from 'utils/popover';
import { ApplicationError } from 'utils/errors';
import { t } from 'i18next';

import { getRatingByCommunity } from 'utils/profileManagement';
import {
  getPermissions,
  hasCommunityModeratorRole,
  hasGlobalModeratorRole,
  hasProtocolAdminRole,
  hasRoleInFrozenCommunity,
} from 'utils/properties';

import { hasFrozenComunity } from 'utils/communityManagement';

/* eslint prefer-destructuring: 0 */
export const voteToDeleteValidator = (profileInfo, questionData, postButtonId, item) => {
  const MIN_RATING = 100;
  const MIN_ENERGY_TO_DELETE_QUESTION = 3;
  const MIN_ENERGY_TO_DELETE_ANSWER = 2;
  const MIN_ENERGY_TO_DELETE_COMMENT = 1;

  let message;
  let itemData;
  let minEnergy;

  /*
   * Input data: @questionId, @answerId, @commentId
   * Output data: @itemData, information about item, which was clicked to vote to delete
   */

  if (!item.answerId && !item.commentId) {
    itemData = questionData;
    minEnergy = MIN_ENERGY_TO_DELETE_QUESTION;
  } else if (!item.answerId && item.commentId) {
    itemData = questionData.comments.filter((x) => x.id === item.commentId)[0];
    minEnergy = MIN_ENERGY_TO_DELETE_COMMENT;
  } else if (item.answerId && !item.commentId) {
    itemData = questionData.answers.filter((x) => x.id === item.answerId)[0];
    minEnergy = MIN_ENERGY_TO_DELETE_ANSWER;
  } else if (item.answerId && item.commentId) {
    itemData = questionData.answers
      .filter((x) => x.id === item.answerId)[0]
      .comments.filter((y) => y.id === item.commentId)[0];
    minEnergy = MIN_ENERGY_TO_DELETE_COMMENT;
  }

  if (itemData.votingStatus?.isUpVoted || itemData.votingStatus?.isDownVoted) {
    message = t('post.cannotCompleteBecauseVoted');
  } else if (itemData.user === profileInfo.user) {
    message = t('post.noRootsToVote');
  } else if (itemData.votingStatus?.isVotedToDelete) {
    message = t('post.youVoted');
  } else if (
    !hasGlobalModeratorRole(profileInfo.permissions) &&
    !hasProtocolAdminRole(profileInfo.permissions) &&
    profileInfo.rating < MIN_RATING
  ) {
    message = t('post.notEnoughRating');
  } else if (profileInfo.energy < minEnergy) {
    message = t('post.notEnoughEnergy');
  }

  if (message) {
    showPopover(postButtonId, message);
    throw new ApplicationError(message);
  }
};

export const postAnswerValidator = (profileInfo, questionData, postButtonId, communities) => {
  const maxAnswersNumber = 200;

  const MIN_RATING_FOR_MY_QUESTION = 0;
  const MIN_RATING_FOR_OTHER_QUESTIONS = 0;
  const communityId = questionData.communityId;
  const isHasRoleInFrozenCommunity = hasRoleInFrozenCommunity(profileInfo, communityId);
  const isHasFrozenComunity = hasFrozenComunity(communities, communityId);
  const isAnswered = !!questionData.answers.filter((x) => x.user === profileInfo.user).length;
  const communityRating = getRatingByCommunity(profileInfo, communityId);

  let message;

  if (!isHasRoleInFrozenCommunity && isHasFrozenComunity) {
    message = t('formFields.frozen');
  } else if (profileInfo.communityBans?.includes(questionData.communityId)) {
    message = `${t('formFields.banned')}`;
  } else if (questionData.answers.length === maxAnswersNumber) {
    message = t('post.itemsMax');
  } else if (isAnswered) {
    message = t('post.alreadyAnswered');
  } else if (
    !hasGlobalModeratorRole(profileInfo.permissions) &&
    !hasCommunityModeratorRole(profileInfo.permissions, communityId) &&
    !hasProtocolAdminRole(profileInfo.permissions) &&
    questionData.author.user === profileInfo.user &&
    communityRating < MIN_RATING_FOR_MY_QUESTION
  ) {
    message = `${t('post.notEnoughRating')} ${MIN_RATING_FOR_MY_QUESTION} ${t(
      'post.inThisCommunity',
    )}`;
  } else if (
    !hasGlobalModeratorRole(profileInfo.permissions) &&
    !hasCommunityModeratorRole(profileInfo.permissions, communityId) &&
    !hasProtocolAdminRole(profileInfo.permissions) &&
    questionData.author.user !== profileInfo.user &&
    communityRating < MIN_RATING_FOR_OTHER_QUESTIONS
  ) {
    message = `${t('post.notEnoughRating')} ${MIN_RATING_FOR_OTHER_QUESTIONS} ${t(
      'post.inThisCommunity',
    )}`;
  }

  if (message) {
    showPopover(postButtonId, message);
    throw new ApplicationError(message);
  }
};

// TODO: retest
export const postCommentValidator = (
  profileInfo,
  questionData,
  postButtonId,
  answerId,
  communities,
) => {
  const maxCommentsNumber = 200;

  const MIN_RATING_FOR_MY_ITEM = 0;
  const MIN_RATING_FOR_OTHER_ITEMS = 35;
  const MIN_ENERGY = 4;
  const communityId = questionData.communityId;
  const isHasRoleInFrozenCommunity = hasRoleInFrozenCommunity(profileInfo, communityId);
  const isHasFrozenComunity = hasFrozenComunity(communities, communityId);

  let item = questionData;
  if (answerId) {
    item = questionData.answers.find((x) => x.id === answerId);
  }

  let message;

  if (!isHasRoleInFrozenCommunity && isHasFrozenComunity) {
    message = t('formFields.frozen');
  } else if (profileInfo.communityBans?.includes(questionData.communityId)) {
    message = `${t('formFields.banned')}`;
  } else if (item.comments.length === maxCommentsNumber) {
    message = t('post.itemsMax');
  } else if (
    !hasGlobalModeratorRole(profileInfo.permissions) &&
    !hasCommunityModeratorRole(profileInfo.permissions, communityId) &&
    !hasProtocolAdminRole(profileInfo.permissions) &&
    (item.author.id === profileInfo.user || questionData.author.user === profileInfo.user) &&
    getRatingByCommunity(profileInfo, communityId) < MIN_RATING_FOR_MY_ITEM
  ) {
    message = `${t('post.notEnoughRating')} ${MIN_RATING_FOR_MY_ITEM} ${t('post.inThisCommunity')}`;
  } else if (
    item.author.id !== profileInfo.user &&
    !hasGlobalModeratorRole(profileInfo.permissions) &&
    !hasCommunityModeratorRole(profileInfo.permissions, communityId) &&
    !hasProtocolAdminRole(profileInfo.permissions) &&
    questionData.author.user !== profileInfo.user &&
    getRatingByCommunity(profileInfo, communityId) < MIN_RATING_FOR_OTHER_ITEMS
  ) {
    message = `${t('post.notEnoughRating')} ${MIN_RATING_FOR_OTHER_ITEMS} ${t(
      'post.inThisCommunity',
    )}`;
  } else if (!isSuiBlockchain && profileInfo.energy < MIN_ENERGY) {
    message = t('post.notEnoughEnergy');
  }

  if (message) {
    showPopover(postButtonId, message);
    throw new ApplicationError(message);
  }
};

export const markAsAcceptedValidator = (profileInfo, questionData, postButtonId) => {
  const MIN_RATING = 0;
  const MIN_ENERGY = 1;
  const communityId = questionData.communityId;
  let message;
  const user = isSuiBlockchain ? profileInfo.id : profileInfo.user;
  if (profileInfo.communityBans?.includes(questionData.communityId)) {
    message = `${t('formFields.banned')}`;
  } else if (user.toLowerCase() !== questionData.author.user.toLowerCase()) {
    message = t('post.noRootsToVote');
  } else if (
    !hasGlobalModeratorRole(profileInfo.permissions) &&
    !hasProtocolAdminRole(profileInfo.permissions) &&
    getRatingByCommunity(profileInfo, communityId) < MIN_RATING
  ) {
    message = `${t('post.notEnoughRating')} ${MIN_RATING} ${t('post.inThisCommunity')}`;
  } else if (!isSuiBlockchain && profileInfo.energy < MIN_ENERGY) {
    message = t('post.notEnoughEnergy');
  }

  if (message) {
    showPopover(postButtonId, message);
    throw new ApplicationError(message);
  }
};

export const upVoteValidator = (profileInfo, questionData, postButtonId, answerId, communities) => {
  const MIN_RATING_TO_UPVOTE = 35;
  const MIN_ENERGY = 1;
  const communityId = questionData.communityId;
  const isHasRoleInFrozenCommunity = hasRoleInFrozenCommunity(profileInfo, communityId);
  const isHasFrozenComunity = hasFrozenComunity(communities, communityId);
  const isOwnItem = questionData.answers.filter((x) => x.id === answerId);

  let message;

  if (!isHasRoleInFrozenCommunity && isHasFrozenComunity) {
    message = t('formFields.frozen');
  } else if (profileInfo.communityBans?.includes(questionData.communityId)) {
    message = `${t('formFields.banned')}`;
  } else if (
    (answerId === '0' && questionData.votingStatus?.isVotedToDelete) ||
    (isOwnItem[0] && isOwnItem[0].votingStatus?.isVotedToDelete)
  ) {
    message = t('post.cannotCompleteBecauseBlocked');
  } else if (
    (questionData.author.user === profileInfo.user && answerId === '0') ||
    (isOwnItem[0] && isOwnItem[0].author.id === profileInfo.user)
  ) {
    message = t('post.noRootsToVote');
  } else if (
    getRatingByCommunity(profileInfo, communityId) < MIN_RATING_TO_UPVOTE &&
    !hasGlobalModeratorRole(profileInfo.permissions) &&
    !hasCommunityModeratorRole(profileInfo.permissions, communityId) &&
    !hasProtocolAdminRole(profileInfo.permissions)
  ) {
    message = `${t('post.notEnoughRating')} ${MIN_RATING_TO_UPVOTE} ${t('post.inThisCommunity')}`;
  } else if (!isSuiBlockchain && profileInfo.energy < MIN_ENERGY) {
    message = t('post.notEnoughEnergy');
  }

  if (message) {
    showPopover(postButtonId, message);
    throw new ApplicationError(message);
  }
};

export const downVoteValidator = (
  profileInfo,
  questionData,
  postButtonId,
  answerId,
  communities,
) => {
  const MIN_RATING_TO_DOWNVOTE = 100;
  const MIN_ENERGY_TO_DOWNVOTE_QUESTION = 5;
  const MIN_ENERGY_TO_DOWNVOTE_ANSWER = 3;
  const MIN_ENERGY_TO_CHANGE_DECISION = 1;
  const communityId = questionData.communityId;
  const isHasRoleInFrozenCommunity = hasRoleInFrozenCommunity(profileInfo, communityId);
  const isHasFrozenComunity = hasFrozenComunity(communities, communityId);
  const minEnergy =
    answerId === '0' ? MIN_ENERGY_TO_DOWNVOTE_QUESTION : MIN_ENERGY_TO_DOWNVOTE_ANSWER;

  let message;

  const item =
    answerId === '0' ? questionData : questionData.answers.find((x) => x.id === answerId);

  const isOwnItem = questionData.answers.filter((x) => x.id === answerId);
  if (!isHasRoleInFrozenCommunity && isHasFrozenComunity) {
    message = t('formFields.frozen');
  } else if (profileInfo.communityBans?.includes(questionData.communityId)) {
    message = `${t('formFields.banned')}`;
  } else if (item.votingStatus?.isVotedToDelete) {
    message = t('post.cannotCompleteBecauseBlocked');
  } else if (
    (questionData.author.user === profileInfo.user && answerId === '0') ||
    (isOwnItem[0] && isOwnItem[0].author.id === profileInfo.user)
  ) {
    message = t('post.noRootsToVote');
  } else if (
    getRatingByCommunity(profileInfo, communityId) < MIN_RATING_TO_DOWNVOTE &&
    !hasGlobalModeratorRole(profileInfo.permissions) &&
    !hasCommunityModeratorRole(profileInfo.permissions, communityId) &&
    !hasProtocolAdminRole(profileInfo.permissions)
  ) {
    message = `${t('post.notEnoughRating')} ${MIN_RATING_TO_DOWNVOTE} ${t('post.inThisCommunity')}`;
  } else if (
    (!isSuiBlockchain &&
      item.votingStatus.isDownVoted &&
      profileInfo.energy < MIN_ENERGY_TO_CHANGE_DECISION) ||
    (!isSuiBlockchain && !item.votingStatus.isDownVoted && profileInfo.energy < minEnergy)
  ) {
    message = t('post.notEnoughEnergy');
  }

  if (message) {
    showPopover(postButtonId, message);
    throw new ApplicationError(message);
  }
};

export const deleteQuestionValidator = (postButtonId, profileInfo, questionData, communities) => {
  const MIN_ENERGY = 2;
  const communityId = questionData.communityId;
  const isHasRoleInFrozenCommunity = hasRoleInFrozenCommunity(profileInfo, communityId);
  const isHasFrozenComunity = hasFrozenComunity(communities, communityId);
  let message;

  if (!isHasRoleInFrozenCommunity && isHasFrozenComunity) {
    message = t('formFields.frozen');
  } else if (profileInfo.communityBans?.includes(questionData.communityId)) {
    message = `${t('formFields.banned')}`;
  } else if (questionData.votingStatus?.isUpVoted) {
    message = t('post.cannotCompleteBecauseVoted');
  } else if (!isSuiBlockchain && profileInfo.energy < MIN_ENERGY) {
    message = t('post.notEnoughEnergy');
  }

  if (message) {
    showPopover(postButtonId, message);
    throw new ApplicationError(message);
  }
};

export const deleteAnswerValidator = (
  postButtonId,
  answerid,
  correctAnswerId,
  profileInfo,
  questionData,
  communities,
) => {
  const MIN_ENERGY = 2;
  const communityId = questionData.communityId;
  const isHasRoleInFrozenCommunity = hasRoleInFrozenCommunity(profileInfo, communityId);
  const isHasFrozenComunity = hasFrozenComunity(communities, communityId);

  const isGlobalAdmin =
    hasGlobalModeratorRole(getPermissions(profileInfo)) ||
    hasProtocolAdminRole(profileInfo.permissions);

  let message;
  const itemData = questionData.answers.filter((x) => x.id === answerid)[0];

  if (!isHasRoleInFrozenCommunity && isHasFrozenComunity) {
    message = t('formFields.frozen');
  } else if (profileInfo.communityBans?.includes(questionData.communityId)) {
    message = `${t('formFields.banned')}`;
  } else if (itemData.votingStatus.isUpVoted && !isGlobalAdmin) {
    message = t('post.cannotCompleteBecauseVoted');
  } else if (!isSuiBlockchain && profileInfo.energy < MIN_ENERGY) {
    message = t('post.notEnoughEnergy');
  }

  if (message) {
    showPopover(postButtonId, message);
    throw new ApplicationError(message);
  }
};

export const deleteCommentValidator = (
  profileInfo,
  postButtonId,
  commentId,
  questionData,
  communities,
) => {
  const MIN_ENERGY = 1;
  const communityId = questionData.communityId;
  const isHasRoleInFrozenCommunity = hasRoleInFrozenCommunity(profileInfo, communityId);
  const isHasFrozenComunity = hasFrozenComunity(communities, communityId);

  let message;
  const itemData = questionData.comments.filter((x) => x.id === commentId)[0];

  if (!isHasRoleInFrozenCommunity && isHasFrozenComunity) {
    message = t('formFields.frozen');
  } else if (profileInfo.communityBans?.includes(communityId)) {
    message = `${t('formFields.banned')}`;
  } else if (itemData?.votingStatus?.isUpVoted) {
    message = t('post.cannotCompleteBecauseVoted');
  } else if (!isSuiBlockchain && profileInfo.energy < MIN_ENERGY) {
    message = t('post.notEnoughEnergy');
  }

  if (message) {
    showPopover(postButtonId, message);
    throw new ApplicationError(message);
  }
};

// TODO: test
export const editCommentValidator = (profileInfo, postButtonId) => {
  const MIN_ENERGY = 1;

  let message;

  if (!isSuiBlockchain && profileInfo.energy < MIN_ENERGY) {
    message = t('post.notEnoughEnergy');
  }

  if (message) {
    showPopover(postButtonId, message);
    throw new ApplicationError(message);
  }
};
