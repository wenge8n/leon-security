import I18n from 'react-native-i18n';

// Import all locales
import en from './locales/en.json';
import ru from './locales/ru.json';
import fr from './locales/fr.json';

// Should the app fallback to English if user locale doesn't exists
I18n.fallbacks = true;

// Define the supported translations
I18n.translations = {
  en,
  ru,
  fr,
};

// The method we'll use instead of a regular string
export function strings(name, params = {}) {
  return I18n.t(name, params);
}

export default I18n;
