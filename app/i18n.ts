import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en';
import zh from './locales/zh';
import es from './locales/es';
import vi from './locales/vi';
import ru from './locales/ru';
import uk from './locales/uk';
import fr from './locales/fr';
import de from './locales/de';

export const languages = {
  en: 'en',
  // de: 'de',
  es: 'es',
  // fr: 'fr',
  // ru: 'ru',
  // uk: 'uk',
  vi: 'vi',
  zh: 'zh',
};

export const languagesWithDescriptions = [
  { language: 'en', description: 'english' },
  { language: 'zh', description: 'chinese' },
  { language: 'es', description: 'spanish' },
  { language: 'vi', description: 'vietnamese' },
  // { language: 'ru', description: 'russian' },
  // { language: 'uk', description: 'ukrainian' },
  // { language: 'fr', description: 'french' },
  // { language: 'de', description: 'german' },
];

export const languagesEnum = {
  en: 0,
  zh: 1,
  es: 2,
  vi: 3,
  ru: 4,
  uk: 5,
  fr: 6,
  de: 7,
};

export const localeRFC5646 = {
  en: 'en-US',
  zh: 'zh-Hans-CN',
  es: 'es-ES',
  vi: 'vi-VN',
  ru: 'ru-RU',
  uk: 'uk-UA',
  fr: 'fr-FR',
  de: 'de-DE',
};

export const i18n = i18next.use(Backend).use(LanguageDetector).use(initReactI18next).init({
  resources: {
    en,
    zh,
    es,
    vi,
    ru,
    uk,
    fr,
    de,
  },
  lng: 'en',
  fallbackLng: 'en',
});

export const currentLocale = i18next.language;

export const { changeLanguage } = i18next;

export const DEFAULT_LOCALE = 'en';
