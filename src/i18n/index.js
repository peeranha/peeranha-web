import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';

import enTranslationMessages from './en';

const defaultLocale = process.env.DEFAULT_LOCALE;

addLocaleData([...enLocaleData]);

export const appLocales = [
  'en',
];

export const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages = locale !== defaultLocale
    ? formatTranslationMessages(defaultLocale, enTranslationMessages)
    : {};

  return Object.keys(messages).reduce((formattedMessages, key) => {
    const formattedMessage = !messages[key] && locale !== defaultLocale
      ? defaultFormattedMessages[key]
      : messages[key];

    return Object.assign(formattedMessages, { [key]: formattedMessage });
  }, {});
};

export const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
};
