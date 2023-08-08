export const CLanguages = {
  en: 'en',
  es: 'es'
} as const

export type TLanguage = typeof CLanguages[keyof typeof CLanguages]
