import { type TInputsFormData } from '@/models/'
import { z as zValidator } from 'zod'

export const inputsData: TInputsFormData = [
  {
    name: 'email',
    type: 'email',
    placeholder: 'example@gmail.com',
    validation: zValidator.string().email()
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'password',
    validation: zValidator.string().min(12).max(60)
  }
]
