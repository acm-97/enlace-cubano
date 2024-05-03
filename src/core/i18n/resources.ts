import en from '@/translations/en.json'
import es from '@/translations/es.json'

export const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: es,
  },
}

export type Language = keyof typeof resources
