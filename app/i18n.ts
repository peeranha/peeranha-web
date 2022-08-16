import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en';
import es from './locales/es';
import zh from './locales/zh';
import vi from './locales/vi';

export const languages = {
  en: 'en',
  es: 'es',
  zh: 'zh',
  vi: 'vi',
};

export const i18n = i18next.use(initReactI18next).init({
  resources: {
    en,
    es,
    zh,
    vi,
  },
  lng: 'en',
  fallbackLng: 'en',
});

export const currentLocale = i18next.language;

export const { changeLanguage } = i18next;

const addLocaleData = require('react-intl').addLocaleData; //eslint-disable-line
const enLocaleData = require('react-intl/locale-data/en');
const ruLocaleData = require('react-intl/locale-data/ru');

const enTranslationMessages = require('./translations/en.json');
const ruTranslationMessages = require('./translations/ru.json');

addLocaleData(enLocaleData);
addLocaleData(ruLocaleData);

export const DEFAULT_LOCALE = 'en';
