import { showPopover } from 'utils/popover';

import messages from './messages';

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
    x => x.user === profileInfo.owner,
  ).length;

  let message;

  if (questionData.answers.length === maxAnswersNumber) {
    message = `${translations[messages.itemsMax.id]}`;
  } else if (isAnswered) {
    message = `${translations[messages.alreadyAnswered.id]}`;
  } else if (
    questionData.user === profileInfo.owner &&
    profileInfo.rating < minRatingForMyQuestion
  ) {
    message = `${
      translations[messages.notEnoughRating.id]
    } ${minRatingForMyQuestion}`;
  } else if (
    questionData.user !== profileInfo.owner &&
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
    ((questionData.user === profileInfo.owner && answerId == 0) ||
      (isOwnItem[0] && isOwnItem[0].user === profileInfo.owner)) &&
    profileInfo.rating < minRatingForMyItem
  ) {
    message = `${
      translations[messages.notEnoughRating.id]
    } ${minRatingForMyItem}`;
  } else if (
    ((questionData.user !== profileInfo.owner && answerId == 0) ||
      (isOwnItem[0] && isOwnItem[0].user !== profileInfo.owner)) &&
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
  if (profileInfo.owner !== questionData.user) {
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
  const isOwnItem = questionData.answers.filter(x => x.id === answerId);

  let message;

  if (
    (questionData.user === profileInfo.owner && answerId == 0) ||
    (isOwnItem[0] && isOwnItem[0].user === profileInfo.owner)
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
  const isOwnItem = questionData.answers.filter(x => x.id === answerId);

  let message;

  if (
    (questionData.user === profileInfo.owner && answerId == 0) ||
    (isOwnItem[0] && isOwnItem[0].user === profileInfo.owner)
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
