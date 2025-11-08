import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization'; // 1. IMPORTE A BIBLIOTECA

import pt from '../locales/pt.json';
import es from '../locales/es.json';

const locales = Localization.getLocales();
let deviceLanguage = 'pt'; // Padrão, caso algo falhe

if (locales && locales.length > 0) {
  deviceLanguage = locales[0].languageCode;
}

i18n
  .use(initReactI18next) 
  .init({
    compatibilityJSON: 'v3', 
    
    lng: deviceLanguage,

    fallbackLng: 'pt', // Idioma para o qual ele deve reverter se o idioma do celular não for 'pt' nem 'es'

    resources: {
      pt: pt,
      es: es
    },

    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;