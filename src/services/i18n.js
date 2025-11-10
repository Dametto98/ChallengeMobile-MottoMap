import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import pt from '../locales/pt.json';
import es from '../locales/es.json';

let deviceLanguage = 'pt'; // Padrão, caso algo falhe

try {
  const locales = Localization.getLocales();
  if (locales && locales.length > 0 && locales[0].languageCode) {
    const langCode = locales[0].languageCode;
    // Só aceita 'pt' ou 'es', caso contrário usa o padrão
    if (langCode === 'pt' || langCode === 'es') {
      deviceLanguage = langCode;
    }
  }
} catch (error) {
  console.warn('[i18n] Erro ao obter idioma do dispositivo:', error);
  // Mantém o padrão 'pt'
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
    },

    // Previne erros em caso de chaves faltando
    react: {
      useSuspense: false,
    },
  });

export default i18n;