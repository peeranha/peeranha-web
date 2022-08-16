import { currentLocale } from 'app/i18n';
import { createSelector } from 'reselect';

const locale = () => currentLocale;

const makeSelectLocale = () => createSelector(locale, () => currentLocale);

export { makeSelectLocale };
