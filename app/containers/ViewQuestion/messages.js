/*
 * ViewQuestion Messages
 *
 * This contains all the text for the ViewQuestion component.
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'app.containers.ViewQuestion.title',
    defaultMessage: `Question's page`,
  },
  description: {
    id: 'app.containers.ViewQuestion.description',
    defaultMessage: `Question's description`,
  },
  questionNotExist: {
    id: 'app.containers.ViewQuestion.questionNotExist',
    defaultMessage: `This question does not exist :(`,
  },
  saveButton: {
    id: 'app.containers.ViewQuestion.saveButton',
    defaultMessage: `Save`,
  },
  deleteButton: {
    id: 'app.containers.ViewQuestion.deleteButton',
    defaultMessage: `Delete`,
  },
  editButton: {
    id: 'app.containers.ViewQuestion.editButton',
    defaultMessage: `Edit`,
  },
  commentButton: {
    id: 'app.containers.ViewQuestion.commentButton',
    defaultMessage: `Comment`,
  },
  postCommentButton: {
    id: 'app.containers.ViewQuestion.postCommentButton',
    defaultMessage: `Post comment`,
  },
  answers: {
    id: 'app.containers.ViewQuestion.answers',
    defaultMessage: `answers`,
  },
  postAnswerButton: {
    id: 'app.containers.ViewQuestion.postAnswerButton',
    defaultMessage: `Post answer`,
  },
  yourAnswer: {
    id: 'app.containers.ViewQuestion.yourAnswer',
    defaultMessage: `Your answer`,
  },
  notEnoughRating: {
    id: 'app.containers.ViewQuestion.notEnoughRating',
    defaultMessage: 'To complete this action, your rating has to be more than',
  },
  alreadyAnswered: {
    id: 'app.containers.ViewQuestion.notEnoughRating',
    defaultMessage: 'You already answered this question',
  },
  itemsMax: {
    id: 'app.containers.ViewQuestion.itemsMax',
    defaultMessage: 'Number of items is achieved of maximum',
  },
  noRootsToVote: {
    id: 'app.containers.ViewQuestion.noRootsToVote',
    defaultMessage: 'You cannot vote to own questions and answers',
  },
  youHaveAnswers: {
    id: 'app.containers.ViewQuestion.youHaveAnswers',
    defaultMessage:
      'You cannot delete it because you already have some answers by your question',
  },
  answerIsCorrect: {
    id: 'app.containers.ViewQuestion.answerIsCorrect',
    defaultMessage:
      'You cannot delete it because your answer is marked as correct',
  },
});
