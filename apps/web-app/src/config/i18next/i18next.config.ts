import { globalConfig } from '@/config'
import { getFromStorage } from '@/utils'
import i18n from 'i18next'
import Backend from 'i18next-chained-backend'
import SecondaryHttpBackend from 'i18next-http-backend'
import PrimaryLocalStorageBackend from 'i18next-localstorage-backend'
import { initReactI18next } from 'react-i18next'

void i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: getFromStorage(globalConfig.localStorage.language) ?? 'en',
    fallbackLng: false,
    backend: {
      backends: [
        PrimaryLocalStorageBackend,
        SecondaryHttpBackend
      ],
      backendOptions: [{
        expirationTime: 0.5 * 24 * 60 * 60 * 1000 // 12 hours
      }]
    },
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    }
  })

export default i18n
