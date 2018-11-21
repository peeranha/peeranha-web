/*
 * AskQuestion Messages
 *
 * This contains all the text for the AskQuestion component.
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'app.containers.AskQuestion.title',
    defaultMessage: 'Ask question',
  },
  description: {
    id: 'app.containers.AskQuestion.description',
    defaultMessage: 'Ask question | Description',
  },
  postQuestion: {
    id: 'app.containers.AskQuestion.postQuestion',
    defaultMessage: 'Post question',
  },
  titleLabel: {
    id: 'app.containers.AskQuestion.titleLabel',
    defaultMessage: 'Title',
  },
  contentLabel: {
    id: 'app.containers.AskQuestion.contentLabel',
    defaultMessage: 'Body',
  },
  notEnoughRating: {
    id: 'app.containers.AskQuestion.notEnoughRating',
    defaultMessage: 'To complete this action, your rating has to be more than',
  },
});
