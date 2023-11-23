import { type TFormInputArray } from '@/components/Form/models'
import { getDynamicSchemas } from '@/utils'
import { Trans } from 'react-i18next'
import { z as ZValidator } from 'zod'

const checkBoxNames = [
  'vegetarian',
  'vegan',
  'glutenFree',
  'dairyFree',
  'nutFree',
  'pescatarian',
  'kosher',
  'halal',
  'lowCarb',
  'organic',
  'sugarFree'
]

const checkBoxTranslations = checkBoxNames.map((checkBoxName) => (
  <Trans>dietaryPreferencesValues.{checkBoxName}</Trans>
))

export const dietaryPreferencesSelectedInputsArray: TFormInputArray =
  checkBoxTranslations.map((checkBoxTranslation, index) => ({
    formInputType: 'checkbox',
    name: checkBoxNames[index],
    label: checkBoxTranslation,
    validation: ZValidator.boolean().optional(),
    defaultValue: false
  }))

const dietaryPreferencesDynamicInputsSchemas = getDynamicSchemas(
  dietaryPreferencesSelectedInputsArray
)

export const dietaryPreferencesInputsSchema = ZValidator.object(
  dietaryPreferencesDynamicInputsSchemas
).deepPartial()
