import format from 'date-fns/format';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import {
  differenceInDays,
  differenceInMonths,
  differenceInYears,
} from 'date-fns';

import ru from 'date-fns/locale/ru/index.js';
import en from 'date-fns/locale/en/index.js';

import {
  MONTH_3LETTERS__DAY_TIME,
  MONTH_3LETTERS__DAY_YYYY_TIME,
  MONTH_3LETTERS__DAY_YYYY,
  DD_MM_YYYY,
  DD_MM_YY,
  FULL_MONTH_NAME_DAY_YEAR,
} from './constants';

const options = {
  [MONTH_3LETTERS__DAY_TIME]: 'MMM D, HH:mm',
  [MONTH_3LETTERS__DAY_YYYY_TIME]: 'MMM D YYYY, HH:mm',
  [MONTH_3LETTERS__DAY_YYYY]: 'MMM D, YYYY',
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

export const getDifferenceInDate = /* istanbul ignore next */ date => {
  const dateInMills = date * 1000;
  const days = differenceInDays(Date.now(), dateInMills);
  const months = differenceInMonths(Date.now(), dateInMills);
  const years = differenceInYears(Date.now(), dateInMills);

  if (months < 1) {
    return `${days}D`;
  }

  if (months < 12) {
    return `${months}M`;
  }

  return `${years}Y`;
};

export const dateNowInSeconds = () => Math.trunc(Date.now() / 1000);

export const ONE_DAY_IN_SECONDS = 86400;
export const ONE_HOUR_IN_SECONDS = 3600;
