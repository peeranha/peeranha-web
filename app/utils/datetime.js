import format from 'date-fns/format';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import differenceInMonths from 'date-fns/difference_in_calendar_months';

import ru from 'date-fns/locale/ru/index.js';
import en from 'date-fns/locale/en/index.js';

import {
  MONTH_3LETTERS__DAY_TIME,
  MONTH_3LETTERS__DAY_YYYY_TIME,
  DD_MM_YYYY,
  DD_MM_YY,
  FULL_MONTH_NAME_DAY_YEAR,
} from './constants';

const options = {
  [MONTH_3LETTERS__DAY_TIME]: 'MMM D, HH:mm',
  [MONTH_3LETTERS__DAY_YYYY_TIME]: 'MMM D YYYY, HH:mm',
  [DD_MM_YYYY]: 'DD.MM.YYYY',
  [DD_MM_YY]: 'DD.MM.YY',
  [FULL_MONTH_NAME_DAY_YEAR]: 'MMMM, D, YYYY',
};

const translations = {
  ru,
  en,
};

export const getTimeFromDateToNow = /* istanbul ignore next */ (
  date,
  locale,
) => {
  const dateInMills = date * 1000;
  const localeObj = { locale: translations[locale] };

  return distanceInWordsToNow(dateInMills, localeObj);
};

export const getFormattedDate = /* istanbul ignore next */ (
  date,
  locale,
  dateFormat,
) => {
  const dateInMills = date * 1000;
  const localeObj = {
    locale: translations[locale],
  };
  const dateView = options[dateFormat || DD_MM_YYYY];

  return format(dateInMills, dateView, localeObj);
};

export const getDifferenceInMonths = /* istanbul ignore next */ date => {
  const dateInMills = date * 1000;

  return `${differenceInMonths(Date.now(), dateInMills)}M`;
};
