import format from 'date-fns/format';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

import {
  MONTH_3LETTERS__DAY_TIME,
  MONTH_3LETTERS__DAY_YYYY_TIME,
  DD_MM_YYYY,
} from './constants';

const options = {
  [MONTH_3LETTERS__DAY_TIME]: 'MMM D, HH:mm',
  [MONTH_3LETTERS__DAY_YYYY_TIME]: 'MMM D YYYY, HH:mm',
  [DD_MM_YYYY]: 'DD.MM.YYYY',
};

/* eslint global-require: 1 */
export const getTimeFromDateToNow = (date, locale) => {
  const dateInMills = date * 1000;
  const localeObj = { locale: require(`date-fns/locale/${locale}`) };

  return distanceInWordsToNow(dateInMills, localeObj);
};

/* eslint global-require: 1 */
export const getFormattedDate = (date, locale, dateFormat) => {
  const dateInMills = date * 1000;
  const localeObj = { locale: () => require(`date-fns/locale/${locale}`) };
  const dateView = options[dateFormat || DD_MM_YYYY];

  return format(dateInMills, dateView, localeObj);
};
