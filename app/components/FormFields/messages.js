/*
 * AskQuestion Messages
 *
 * This contains all the text for the AskQuestion component.
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
  wrongLength1x5: {
    id: 'app.containers.FormFields.wrongLength1x5',
    defaultMessage:
      'Value must be at least 1 characters and no longer than 5 characters',
  },
  wrongLength2x15: {
    id: 'app.containers.FormFields.wrongLength2x15',
    defaultMessage:
      'Value must be at least 2 characters and no longer than 15 characters',
  },
  wrongLength3x20: {
    id: 'app.containers.FormFields.wrongLength3x20',
    defaultMessage:
      'Value must be at least 3 characters and no longer than 20 characters',
  },
  wrongLength15x100: {
    id: 'app.containers.FormFields.wrongLength15x100',
    defaultMessage:
      'Value must be at least 15 characters and no longer than 100 characters',
  },
  wrongLength20x1000: {
    id: 'app.containers.FormFields.wrongLength20x1000',
    defaultMessage:
      'Value must be at least 20 characters and no longer than 1000 characters',
  },
  wrongLength25x30000: {
    id: 'app.containers.FormFields.wrongLength25x30000',
    defaultMessage:
      'Value must be at least 25 characters and no longer than 30000 characters',
  },
  wrongLength30000: {
    id: 'app.containers.FormFields.wrongLength30000',
    defaultMessage: 'Maximum number of characters exceeded',
  },
  requiredField: {
    id: 'app.containers.FormFields.requiredField',
    defaultMessage: 'Required field',
  },
  fileSize: {
    id: 'app.containers.FormFields.fileSize',
    defaultMessage: 'File size is exceeded',
  },
  wrongEmail: {
    id: 'app.containers.FormFields.wrongEmail',
    defaultMessage: 'Wrong email',
  },
});
