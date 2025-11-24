import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import des traductions
import commonFR from '../locales/fr/common.json';
import commonEN from '../locales/en/common.json';
import commonES from '../locales/es/common.json';
import commonDE from '../locales/de/common.json';
import commonIT from '../locales/it/common.json';
import commonPT from '../locales/pt/common.json';

const resources = {
  fr: {
    common: commonFR
  },
  en: {
    common: commonEN
  },
  es: {
    common: commonES
  },
  de: {
    common: commonDE
  },
  it: {
    common: commonIT
  },
  pt: {
    common: commonPT
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    debug: import.meta.env.DEV,
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;