// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationBG from './locales/bg/translation.json';

const resources = {
  bg: {
    translation: translationBG,
  },
};

i18n
  .use(initReactI18next) // bind react-i18next to the instance
  .init({
    resources,
    lng: 'bg', // default language
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
