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
  wrongLength20: {
    id: 'app.containers.AskQuestion.wrongLength20',
    defaultMessage: 'Min - 3, Max - 20',
  },
  wrongLength1000: {
    id: 'app.containers.AskQuestion.wrongLength1000',
    defaultMessage: 'Min - 3, Max - 1000',
  },
  requiredField: {
    id: 'app.containers.AskQuestion.requiredField',
    defaultMessage: 'Required field',
  },
});
