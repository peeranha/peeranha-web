import format from 'date-fns/format';
import formatDistance from 'date-fns/formatDistance';
import { differenceInDays, differenceInMonths, differenceInYears } from 'date-fns';
import { localeRFC5646 } from 'app/i18n';

import ru from 'date-fns/locale/ru/index.js';
import uk from 'date-fns/locale/uk/index.js';
import en from 'date-fns/locale/en-US/index.js';
import de from 'date-fns/locale/de/index.js';
import fr from 'date-fns/locale/fr/index.js';
import zh from 'date-fns/locale/zh-CN/index.js';
import vi from 'date-fns/locale/vi/index.js';

import {
  MONTH_3LETTERS__DAY_TIME,
  MONTH_3LETTERS__DAY_YYYY_TIME,
  MONTH_3LETTERS__DAY_YYYY,
  DD_MM_YYYY,
  DD_MM_YY,
  FULL_MONTH_NAME_DAY_YEAR,
} from './constants';

const options = {
  [MONTH_3LETTERS__DAY_TIME]: 'MMM d, HH:mm',
  [MONTH_3LETTERS__DAY_YYYY_TIME]: 'MMM d yyyy, HH:mm',
  [MONTH_3LETTERS__DAY_YYYY]: 'MMM d, yyyy',
  [DD_MM_YYYY]: 'DD.MM.yyyy',
  [DD_MM_YY]: 'DD.MM.YY',
  [FULL_MONTH_NAME_DAY_YEAR]: 'MMMM, d, yyyy',
};

const translations = {
  ru,
  uk,
  en,
  de,
  fr,
  zh,
  vi,
};

export const getTimeFromDateToNow = /* istanbul ignore next */ (date, locale) => {
  const dateInMills = date * 1000;
  const localeObj = { locale: translations[locale] };

  return formatDistance(dateInMills, new Date(), localeObj);
};

const FormatDate = (function () {
  let instance;
  let locale;

  function createIntl(newLocale) {
    const intlObj = Intl.DateTimeFormat(localeRFC5646[newLocale]);
    return intlObj;
  }

  return {
    getFormat(newLocale) {
      if (!instance || locale !== newLocale) {
        instance = createIntl(newLocale);
      }
      return instance;
    },
  };
})();

export const getFormattedDate = (date, locale, dateFormat) => {
  const dateInMills = date * 1000;
  const localeObj = {
    locale: translations[locale],
  };
  const dateView = options[dateFormat || DD_MM_YYYY];

  return format(dateInMills, dateView, localeObj);
};

export const getDifferenceInDate = /* istanbul ignore next */ (date) => {
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
