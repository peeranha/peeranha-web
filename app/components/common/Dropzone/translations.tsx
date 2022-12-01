import React from 'react';
import { translationMessages } from 'i18n';
import messages from '../../QuestionForm/messages';

export const translations = (locale: string) => ({
  dragFiles: translationMessages[locale][messages.dragFiles.id],
  clickTo: translationMessages[locale][messages.clickTo.id],
  attach: translationMessages[locale][messages.attach.id],
  mediaRestrictions: translationMessages[locale][messages.mediaRestrictions.id],
});
