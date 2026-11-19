import { CATALOG_KEYS } from './catalogKeys.js';
import { LANDING_KEYS } from './landingKeys.js';

export const SUPPORTED_LANGUAGES = Object.freeze(['es', 'ca', 'en']);
export const DEFAULT_LANGUAGE = 'es';

export const DICTIONARY = Object.freeze({
  ...LANDING_KEYS,
  ...CATALOG_KEYS
});

export function isValidLanguage(lang) {
  return SUPPORTED_LANGUAGES.includes(lang);
}

export function t(key, lang = DEFAULT_LANGUAGE) {
  const targetLang = isValidLanguage(lang) ? lang : DEFAULT_LANGUAGE;
  const entry = DICTIONARY[key];
  if (!entry) return key;
  return entry[targetLang] || entry[DEFAULT_LANGUAGE] || key;
}

export function getTranslation(localizedObj, lang = DEFAULT_LANGUAGE) {
  if (!localizedObj || typeof localizedObj !== 'object') {
    return String(localizedObj || '');
  }
  const targetLang = isValidLanguage(lang) ? lang : DEFAULT_LANGUAGE;
  return localizedObj[targetLang] || localizedObj[DEFAULT_LANGUAGE] || Object.values(localizedObj)[0] || '';
}
