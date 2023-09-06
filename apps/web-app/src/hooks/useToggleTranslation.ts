import { globalConfig } from '@/config'
import { useTranslation } from '@/hooks'
import { CLanguages } from '@/models/UI'
import { setToLocalStorage } from '@/utils'

export const useToggleTranslation = () => {
  const { i18n: { changeLanguage, language } } = useTranslation()

  const toggleTranslation = () => {
    let newLanguage = ''

    if (CLanguages.en === language) {
      newLanguage = CLanguages.es
    } else {
      newLanguage = CLanguages.en
    }

    void changeLanguage(newLanguage).then(() => {
      setToLocalStorage(globalConfig.localStorage.language, newLanguage)
      window.location.reload()
    })
  }

  return { toggleTranslation, language }
}
