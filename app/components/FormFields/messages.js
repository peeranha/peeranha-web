/*
 * AskQuestion Messages
 *
 * This contains all the text for the AskQuestion component.
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
  wrongLength: {
    id: 'app.containers.AskQuestion.wrongLength',
    defaultMessage: 'Not valid field length',
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
