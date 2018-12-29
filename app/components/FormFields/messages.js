/*
 * AskQuestion Messages
 *
 * This contains all the text for the AskQuestion component.
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
  wrongLength1x5: {
    id: 'app.containers.AskQuestion.wrongLength1x5',
    defaultMessage:
      'Value must be at least 1 characters and no longer than 5 characters',
  },
  wrongLength3x20: {
    id: 'app.containers.AskQuestion.wrongLength3x20',
    defaultMessage:
      'Value must be at least 3 characters and no longer than 20 characters',
  },
  wrongLength15x100: {
    id: 'app.containers.AskQuestion.wrongLength15x100',
    defaultMessage:
      'Value must be at least 15 characters and no longer than 100 characters',
  },
  wrongLength20x1000: {
    id: 'app.containers.AskQuestion.wrongLength20x1000',
    defaultMessage:
      'Value must be at least 20 characters and no longer than 1000 characters',
  },
  wrongLength25x30000: {
    id: 'app.containers.AskQuestion.wrongLength25x30000',
    defaultMessage:
      'Value must be at least 25 characters and no longer than 30000 characters',
  },
  wrongLength30000: {
    id: 'app.containers.AskQuestion.wrongLength30000',
    defaultMessage: 'Maximum number of characters exceeded',
  },
  requiredField: {
    id: 'app.containers.AskQuestion.requiredField',
    defaultMessage: 'Required field',
  },
  fileSize: {
    id: 'app.containers.AskQuestion.fileSize',
    defaultMessage: 'File size is exceeded',
  },
  wrongEmail: {
    id: 'app.containers.AskQuestion.wrongEmail',
    defaultMessage: 'Wrong email',
  },
});
