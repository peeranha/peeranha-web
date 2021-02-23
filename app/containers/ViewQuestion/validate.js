import { showPopover } from 'utils/popover';
import { ApplicationError } from 'utils/errors';

import messages from './messages';

/* eslint prefer-destructuring: 0 */
export const voteToDeleteValidator = (
  profileInfo,
  questionData,
  translations,
  postButtonId,
  item,
) => {
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
    itemData = questionData.comments.filter(x => x.id === item.commentId)[0];
    minEnergy = MIN_ENERGY_TO_DELETE_COMMENT;
  } else if (item.answerId && !item.commentId) {
    itemData = questionData.answers.filter(x => x.id === item.answerId)[0];
    minEnergy = MIN_ENERGY_TO_DELETE_ANSWER;
  } else if (item.answerId && item.commentId) {
    itemData = questionData.answers
      .filter(x => x.id === item.answerId)[0]
      .comments.filter(y => y.id === item.commentId)[0];
    minEnergy = MIN_ENERGY_TO_DELETE_COMMENT;
  }

  if (itemData.votingStatus.isUpVoted || itemData.votingStatus.isDownVoted) {
    message = `${translations[messages.cannotCompleteBecauseVoted.id]}`;
  } else if (itemData.user === profileInfo.user) {
    message = `${translations[messages.noRootsToVote.id]}`;
  } else if (itemData.votingStatus.isVotedToDelete) {
    message = `${translations[messages.youVoted.id]}`;
  } else if (profileInfo.rating < MIN_RATING) {
    message = `${translations[messages.notEnoughRating.id]} ${MIN_RATING}`;
  } else if (profileInfo.energy < minEnergy) {
    message = translations[messages.notEnoughEnergy.id];
  }

  if (message) {
    showPopover(postButtonId, message);
    throw new ApplicationError(message);
  }
};

export const postAnswerValidator = (
  profileInfo,
  questionData,
  postButtonId,
  translations,
) => {
  const maxAnswersNumber = 200;

  const MIN_RATING_FOR_MY_QUESTION = 0;
  const MIN_RATING_FOR_OTHER_QUESTIONS = 0;
  const MIN_ENERGY = 6;

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
    profileInfo.rating < MIN_RATING_FOR_MY_QUESTION
  ) {
    message = `${
      translations[messages.notEnoughRating.id]
    } ${MIN_RATING_FOR_MY_QUESTION}`;
  } else if (
    questionData.user !== profileInfo.user &&
    profileInfo.rating < MIN_RATING_FOR_OTHER_QUESTIONS
  ) {
    message = `${
      translations[messages.notEnoughRating.id]
    } ${MIN_RATING_FOR_OTHER_QUESTIONS}`;
  } else if (profileInfo.energy < MIN_ENERGY) {
    message = translations[messages.notEnoughEnergy.id];
  }

  if (message) {
    showPopover(postButtonId, message);
    throw new ApplicationError(message);
  }
};

// TODO: retest
/* eslint eqeqeq: 0 */
export const postCommentValidator = (
  profileInfo,
  questionData,
  postButtonId,
  answerId,
  translations,
) => {
  const maxCommentsNumber = 200;

  const MIN_RATING_FOR_MY_ITEM = 0;
  const MIN_RATING_FOR_OTHER_ITEMS = 35;
  const MIN_ENERGY = 4;

  let item = questionData;

  if (answerId > 0) {
    item = questionData.answers.find(x => x.id === answerId);
  }

  let message;

  if (item.comments.length === maxCommentsNumber) {
    message = `${translations[messages.itemsMax.id]}`;
  } else if (
    (item.user === profileInfo.user ||
      questionData.user === profileInfo.user) &&
    profileInfo.rating < MIN_RATING_FOR_MY_ITEM
  ) {
    message = `${
      translations[messages.notEnoughRating.id]
    } ${MIN_RATING_FOR_MY_ITEM}`;
  } else if (
    item.user !== profileInfo.user &&
    questionData.user !== profileInfo.user &&
    profileInfo.rating < MIN_RATING_FOR_OTHER_ITEMS
  ) {
    message = `${
      translations[messages.notEnoughRating.id]
    } ${MIN_RATING_FOR_OTHER_ITEMS}`;
  } else if (profileInfo.energy < MIN_ENERGY) {
    message = translations[messages.notEnoughEnergy.id];
  }

  if (message) {
    showPopover(postButtonId, message);
    throw new ApplicationError(message);
  }
};

export const markAsAcceptedValidator = (
  profileInfo,
  questionData,
  postButtonId,
  translations,
) => {
  const MIN_RATING = 0;
  const MIN_ENERGY = 1;

  let message;

  if (profileInfo.user !== questionData.user) {
    message = `${translations[messages.noRootsToVote.id]}`;
  } else if (profileInfo.rating < MIN_RATING) {
    message = `${translations[messages.notEnoughRating.id]} ${MIN_RATING}`;
  } else if (profileInfo.energy < MIN_ENERGY) {
    message = translations[messages.notEnoughEnergy.id];
  }

  if (message) {
    showPopover(postButtonId, message);
    throw new ApplicationError(message);
  }
};

export const upVoteValidator = (
  profileInfo,
  questionData,
  postButtonId,
  answerId,
  translations,
) => {
  const MIN_RATING_TO_UPVOTE = 35;
  const MIN_ENERGY = 1;

  const isOwnItem = questionData.answers.filter(x => x.id === answerId);

  let message;

  if (
    (answerId === 0 && questionData.votingStatus.isVotedToDelete) ||
    (isOwnItem[0] && isOwnItem[0].votingStatus.isVotedToDelete)
  ) {
    message = translations[messages.cannotCompleteBecauseBlocked.id];
  } else if (
    (questionData.user === profileInfo.user && answerId === 0) ||
    (isOwnItem[0] && isOwnItem[0].user === profileInfo.user)
  ) {
    message = `${translations[messages.noRootsToVote.id]}`;
  } else if (profileInfo.rating < MIN_RATING_TO_UPVOTE) {
    message = `${
      translations[messages.notEnoughRating.id]
    } ${MIN_RATING_TO_UPVOTE}`;
  } else if (profileInfo.energy < MIN_ENERGY) {
    message = translations[messages.notEnoughEnergy.id];
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
  translations,
) => {
  const MIN_RATING_TO_DOWNVOTE = 100;
  const MIN_ENERGY_TO_DOWNVOTE_QUESTION = 5;
  const MIN_ENERGY_TO_DOWNVOTE_ANSWER = 3;
  const MIN_ENERGY_TO_CHANGE_DECISION = 1;

  const minEnergy =
    answerId === 0
      ? MIN_ENERGY_TO_DOWNVOTE_QUESTION
      : MIN_ENERGY_TO_DOWNVOTE_ANSWER;

  let message;

  const item =
    answerId === 0
      ? questionData
      : questionData.answers.find(x => x.id === answerId);

  if (item.votingStatus.isVotedToDelete) {
    message = translations[messages.cannotCompleteBecauseBlocked.id];
  } else if (item.user === profileInfo.user) {
    message = `${translations[messages.noRootsToVote.id]}`;
  } else if (profileInfo.rating < MIN_RATING_TO_DOWNVOTE) {
    message = `${
      translations[messages.notEnoughRating.id]
    } ${MIN_RATING_TO_DOWNVOTE}`;
  } else if (
    (item.votingStatus.isDownVoted &&
      profileInfo.energy < MIN_ENERGY_TO_CHANGE_DECISION) ||
    (!item.votingStatus.isDownVoted && profileInfo.energy < minEnergy)
  ) {
    message = translations[messages.notEnoughEnergy.id];
  }

  if (message) {
    showPopover(postButtonId, message);
    throw new ApplicationError(message);
  }
};

export const deleteQuestionValidator = (
  postButtonId,
  answersNum,
  translations,
  profileInfo,
  questionData,
) => {
  const ANSWERS_LIMIT = 0;
  const MIN_ENERGY = 2;

  let message;

  if (questionData.votingStatus.isUpVoted) {
    message = `${translations[messages.cannotCompleteBecauseVoted.id]}`;
  } else if (answersNum > ANSWERS_LIMIT) {
    message = `${translations[messages.youHaveAnswers.id]}`;
  } else if (profileInfo.energy < MIN_ENERGY) {
    message = translations[messages.notEnoughEnergy.id];
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
  translations,
  profileInfo,
  questionData,
) => {
  const MIN_ENERGY = 2;

  let message;
  const itemData = questionData.answers.filter(x => x.id === answerid)[0];

  if (itemData.votingStatus.isUpVoted) {
    message = `${translations[messages.cannotCompleteBecauseVoted.id]}`;
  } else if (answerid === correctAnswerId) {
    message = `${translations[messages.answerIsCorrect.id]}`;
  } else if (profileInfo.energy < MIN_ENERGY) {
    message = translations[messages.notEnoughEnergy.id];
  }

  if (message) {
    showPopover(postButtonId, message);
    throw new ApplicationError(message);
  }
};

export const deleteCommentValidator = (
  profileInfo,
  postButtonId,
  translations,
  commentId,
  questionData,
) => {
  const MIN_ENERGY = 1;

  let message;
  const itemData = questionData.comments.filter(x => x.id === commentId)[0];

  if (itemData?.votingStatus.isUpVoted) {
    message = `${translations[messages.cannotCompleteBecauseVoted.id]}`;
  } else if (profileInfo.energy < MIN_ENERGY) {
    message = translations[messages.notEnoughEnergy.id];
  }

  if (message) {
    showPopover(postButtonId, message);
    throw new ApplicationError(message);
  }
};

// TODO: test
export const editCommentValidator = (
  profileInfo,
  postButtonId,
  translations,
) => {
  const MIN_ENERGY = 1;

  let message;

  if (profileInfo.energy < MIN_ENERGY) {
    message = translations[messages.notEnoughEnergy.id];
  }

  if (message) {
    showPopover(postButtonId, message);
    throw new ApplicationError(message);
  }
};
