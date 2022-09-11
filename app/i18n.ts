import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
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

export const localeRFC5646 = {
  en: 'en-US',
  es: 'es-ES',
  zh: 'zh-Hans-CN',
  vi: 'vi-VN',
};

export const i18n = i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
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

export const DEFAULT_LOCALE = 'en';
