import { type TInputsFormData } from '@/models/'
import { CUserValidations } from '@/models/validations'

export const inputsData: TInputsFormData = [
  {
    name: 'username',
    type: 'text',
    validation: CUserValidations.username,
    placeholder: 'example56'
  },
  {
    name: 'email',
    type: 'email',
    validation: CUserValidations.email,
    placeholder: 'example@gmail.com'
  },
  {
    name: 'password',
    type: 'password',
    validation: CUserValidations.password,
    placeholder: 'password'
  }
]
