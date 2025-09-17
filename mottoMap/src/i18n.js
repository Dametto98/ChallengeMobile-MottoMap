import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import pt from './locales/pt.json';
import en from './locales/en.json';

i18n
  .use(initReactI18next) 
  .init({
    compatibilityJSON: 'v3', 
    lng: 'pt', 
    fallbackLng: 'en', 

    resources: {
      pt: pt,
      en: en
    },

    interpolation: {
      escapeValue: false, // Não é necessário para React, pois ele já faz o escape
    }
  });

export default i18n;