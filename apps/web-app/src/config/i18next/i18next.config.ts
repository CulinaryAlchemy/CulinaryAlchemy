import { config } from '@/config'
import { getFromLocalStorage } from '@/utils'
import i18n from 'i18next'
import Backend from 'i18next-chained-backend'
import SecondaryHttpBackend from 'i18next-http-backend'
import PrimaryLocalStorageBackend from 'i18next-localstorage-backend'
import { initReactI18next } from 'react-i18next'

console.log(i18n.services)
void i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: getFromLocalStorage(config.localStorage.language) ?? 'en',
    fallbackLng: false,
    backend: {
      backends: [
        PrimaryLocalStorageBackend,
        SecondaryHttpBackend
      ]
    },
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    }
  })

export default i18n
