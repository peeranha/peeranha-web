import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en';

export const languages = {
  en: 'en',
  ru: 'ru',
};

export const i18n = i18next.use(initReactI18next).init({
  resources: {
    en,
  },
  lng: 'en',
  fallbackLng: 'en',
});
