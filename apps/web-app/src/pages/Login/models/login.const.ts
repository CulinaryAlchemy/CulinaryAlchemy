import { type TInputsFormData } from '@/models/'
import { CUserValidations } from '@/models/validations'

export const inputsData: TInputsFormData = [
  {
    name: 'email',
    type: 'email',
    placeholder: 'example@gmail.com',
    validation: CUserValidations.email
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'password',
    validation: CUserValidations.password
  }
]
