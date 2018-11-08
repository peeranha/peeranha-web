import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

/* eslint global-require: 1 */
export const getTimeFromDateToNow = (date, locale) => {
  const dateInMills = date * 1000;
  const localeObj = { locale: () => require(`date-fns/locale/${locale}`) };

  return distanceInWordsToNow(dateInMills, localeObj);
};
