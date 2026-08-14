import { en } from './en';
import { ml } from './ml';
import { Language } from '../types';

export const translations = { en, ml };

export function getTranslation(lang: Language) {
  return translations[lang] || translations.en;
}
