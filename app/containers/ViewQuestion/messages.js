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
});
