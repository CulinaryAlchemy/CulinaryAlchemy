import { type TInputsFormData } from '@/models/UI'
import { CUserValidations } from '@/models/validations'
import { t } from 'i18next'

export const inputsData: TInputsFormData = [
  {
    name: 'username',
    label: t('register.form.main.inputs.userName'),
    type: 'text',
    validation: CUserValidations.username,
    placeholder: 'Joe Bass'
  },
  {
    name: 'email',
    label: t('register.form.main.inputs.email'),
    type: 'email',
    validation: CUserValidations.email,
    placeholder: 'joe@gmail.com'
  },
  {
    name: 'password',
    label: t('register.form.main.inputs.password'),
    type: 'password',
    validation: CUserValidations.password,
    placeholder: 'wua-wau78'
  }
]
