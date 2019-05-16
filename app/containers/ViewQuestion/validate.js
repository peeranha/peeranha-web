import { showPopover } from 'utils/popover';

import messages from './messages';

/* eslint prefer-destructuring: 0 */
export const voteToDeleteValidator = (
  profileInfo,
  questionData,
  translations,
  postButtonId,
  item,
) => {
  const minRatingToVoteToDelete = 100;
  const minModerationPoints = 0;

  let message;
  let itemData;

  /*
   * Input data: @questionId, @answerId, @commentId
   * Output data: @itemData, information about item, which was clicked to vote to delete
   */

  if (!+item.answerId && !+item.commentId) {
    itemData = questionData;
  } else if (!+item.answerId && +item.commentId) {
    itemData = questionData.comments.filter(x => x.id == item.commentId)[0];
  } else if (+item.answerId && !+item.commentId) {
    itemData = questionData.answers.filter(x => x.id == item.answerId)[0];
  } else if (+item.answerId && +item.commentId) {
    itemData = questionData.answers
      .filter(x => x.id == item.answerId)[0]
      .comments.filter(y => y.id == item.commentId)[0];
  }

  if (itemData.user === profileInfo.user) {
    message = `${translations[messages.noRootsToVote.id]}`;
  } else if (itemData.votingStatus.isVotedToDelete) {
    message = `${translations[messages.youVoted.id]}`;
  } else if (profileInfo.rating < minRatingToVoteToDelete) {
    message = `${
      translations[messages.notEnoughRating.id]
    } ${minRatingToVoteToDelete}`;
  } else if (profileInfo.moderation_points <= minModerationPoints) {
    message = `${
      translations[messages.notEnoughModPoints.id]
    } ${minModerationPoints}`;
  }

  if (message) {
    showPopover(postButtonId, message);
    return false;
  }

  return true;
};

export const postAnswerValidator = (
  profileInfo,
  questionData,
  postButtonId,
  translations,
) => {
  const maxAnswersNumber = 200;
  const minRatingForMyQuestion = 0;
  const minRatingForOtherQuestions = 10;
  const isAnswered = !!questionData.answers.filter(
    x => x.user === profileInfo.user,
  ).length;

  let message;

  if (questionData.answers.length === maxAnswersNumber) {
    message = `${translations[messages.itemsMax.id]}`;
  } else if (isAnswered) {
    message = `${translations[messages.alreadyAnswered.id]}`;
  } else if (
    questionData.user === profileInfo.user &&
    profileInfo.rating < minRatingForMyQuestion
  ) {
    message = `${
      translations[messages.notEnoughRating.id]
    } ${minRatingForMyQuestion}`;
  } else if (
    questionData.user !== profileInfo.user &&
    profileInfo.rating < minRatingForOtherQuestions
  ) {
    message = `${
      translations[messages.notEnoughRating.id]
    } ${minRatingForOtherQuestions}`;
  }

  if (message) {
    showPopover(postButtonId, message);
    return false;
  }

  return true;
};

/* eslint eqeqeq: 0 */
export const postCommentValidator = (
  profileInfo,
  questionData,
  postButtonId,
  answerId,
  translations,
) => {
  const maxCommentsNumber = 200;
  const minRatingForMyItem = 0;
  const minRatingForOtherItems = 30;
  const isOwnItem = questionData.answers.filter(x => x.id === answerId);

  let message;

  if (questionData.comments.length === maxCommentsNumber) {
    message = `${translations[messages.itemsMax.id]}`;
  } else if (
    ((questionData.user === profileInfo.user && answerId == 0) ||
      (isOwnItem[0] && isOwnItem[0].user === profileInfo.user)) &&
    profileInfo.rating < minRatingForMyItem
  ) {
    message = `${
      translations[messages.notEnoughRating.id]
    } ${minRatingForMyItem}`;
  } else if (
    ((questionData.user !== profileInfo.user && answerId == 0) ||
      (isOwnItem[0] && isOwnItem[0].user !== profileInfo.user)) &&
    profileInfo.rating < minRatingForOtherItems
  ) {
    message = `${
      translations[messages.notEnoughRating.id]
    } ${minRatingForOtherItems}`;
  }

  if (message) {
    showPopover(postButtonId, message);
    return false;
  }

  return true;
};

export const markAsAcceptedValidator = (profileInfo, questionData) => {
  if (profileInfo.user !== questionData.user) {
    return false;
  }

  return true;
};

export const upVoteValidator = (
  profileInfo,
  questionData,
  postButtonId,
  answerId,
  translations,
) => {
  const minRatingToUpvote = 35;
  const isOwnItem = questionData.answers.filter(x => x.id === +answerId);

  let message;

  if (
    (questionData.user === profileInfo.user && answerId == 0) ||
    (isOwnItem[0] && isOwnItem[0].user === profileInfo.user)
  ) {
    message = `${translations[messages.noRootsToVote.id]}`;
  } else if (profileInfo.rating < minRatingToUpvote) {
    message = `${
      translations[messages.notEnoughRating.id]
    } ${minRatingToUpvote}`;
  }

  if (message) {
    showPopover(postButtonId, message);
    return false;
  }

  return true;
};

export const downVoteValidator = (
  profileInfo,
  questionData,
  postButtonId,
  answerId,
  translations,
) => {
  const minRatingToDownvote = 100;
  const isOwnItem = questionData.answers.filter(x => x.id === +answerId);

  let message;

  if (
    (questionData.user === profileInfo.user && answerId == 0) ||
    (isOwnItem[0] && isOwnItem[0].user === profileInfo.user)
  ) {
    message = `${translations[messages.noRootsToVote.id]}`;
  } else if (profileInfo.rating < minRatingToDownvote) {
    message = `${
      translations[messages.notEnoughRating.id]
    } ${minRatingToDownvote}`;
  }

  if (message) {
    showPopover(postButtonId, message);
    return false;
  }

  return true;
};

export const deleteQuestionValidator = (
  postButtonId,
  answersNum,
  translations,
) => {
  const answersLimit = 0;

  let message;

  if (answersNum > answersLimit) {
    message = `${translations[messages.youHaveAnswers.id]}`;
  }

  if (message) {
    showPopover(postButtonId, message);
    return false;
  }

  return true;
};

export const deleteAnswerValidator = (
  postButtonId,
  answerid,
  correctAnswerId,
  translations,
) => {
  let message;

  if (+answerid === correctAnswerId) {
    message = `${translations[messages.answerIsCorrect.id]}`;
  }

  if (message) {
    showPopover(postButtonId, message);
    return false;
  }

  return true;
};
