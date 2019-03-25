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

// TODO: `date-fns/locale/${locale}/index.js` - such record means that all locales includes in bundle - impove it later

/* eslint global-require: 1 */
export const getTimeFromDateToNow = /* istanbul ignore next */ (
  date,
  locale,
) => {
  const dateInMills = date * 1000;
  const localeObj = { locale: require(`date-fns/locale/${locale}/index.js`) };

  return distanceInWordsToNow(dateInMills, localeObj);
};

/* eslint global-require: 1 */
export const getFormattedDate = /* istanbul ignore next */ (
  date,
  locale,
  dateFormat,
) => {
  const dateInMills = date * 1000;
  const localeObj = {
    locale: () => require(`date-fns/locale/${locale}/index.js`),
  };
  const dateView = options[dateFormat || DD_MM_YYYY];

  return format(dateInMills, dateView, localeObj);
};
