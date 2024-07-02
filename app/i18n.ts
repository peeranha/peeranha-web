import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en';
import de from './locales/de';
import es from './locales/es';
import fr from './locales/fr';
import ru from './locales/ru';
import uk from './locales/uk';
import vi from './locales/vi';
import zh from './locales/zh';

export const languages = {
  en: 'en',
  de: 'de',
  es: 'es',
  fr: 'fr',
  ru: 'ru',
  uk: 'uk',
  vi: 'vi',
  zh: 'zh',
};

export const languagesWithDescriptions = [
  { language: 'en', description: 'english' },
  { language: 'de', description: 'german' },
  { language: 'es', description: 'spanish' },
  { language: 'fr', description: 'french' },
  { language: 'ru', description: 'russian' },
  { language: 'uk', description: 'ukrainian' },
  { language: 'vi', description: 'vietnamese' },
  { language: 'zh', description: 'chinese' },
];
export const languagesEnum = { en: 0, de: 1, es: 2, fr: 3, ru: 4, uk: 5, vi: 6, zh: 7 };

export const localeRFC5646 = {
  en: 'en-US',
  de: 'de-DE',
  es: 'es-ES',
  fr: 'fr-FR',
  ru: 'ru-RU',
  uk: 'uk-UA',
  vi: 'vi-VN',
  zh: 'zh-Hans-CN',
};

export const i18n = i18next.use(Backend).use(LanguageDetector).use(initReactI18next).init({
  resources: {
    en,
    de,
    es,
    fr,
    ru,
    uk,
    vi,
    zh,
  },
  lng: 'en',
  fallbackLng: 'en',
});

export const currentLocale = i18next.language;

export const { changeLanguage } = i18next;

export const DEFAULT_LOCALE = 'en';
