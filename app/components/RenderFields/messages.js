/*
 * AskQuestion Messages
 *
 * This contains all the text for the AskQuestion component.
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
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
  fileSize: {
    id: 'app.containers.AskQuestion.fileSize',
    defaultMessage: 'File size is exceeded',
  },
});
