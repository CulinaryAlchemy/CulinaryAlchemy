import { type TInputsFormData } from '@/models/UI'
import { CUserValidations } from '@/models/validations'
import { t } from 'i18next'

export const inputsData: TInputsFormData = [
  {
    name: t('login.form.main.inputs.email'),
    type: 'email',
    placeholder: 'example@gmail.com',
    validation: CUserValidations.email
  },
  {
    name: t('login.form.main.inputs.password'),
    type: 'password',
    placeholder: 'password',
    validation: CUserValidations.password
  }
]
