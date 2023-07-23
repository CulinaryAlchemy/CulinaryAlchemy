import { type TInputsFormData } from '@/models/'
import { z as zValidator } from 'zod'

export const inputsData: TInputsFormData = [
  {
    name: 'username',
    type: 'text',
    validation: zValidator.string().min(3),
    placeholder: 'example56'
  },
  {
    name: 'email',
    type: 'email',
    validation: zValidator.string().email().min(4).max(254),
    placeholder: 'example@gmail.com'
  },
  {
    name: 'password',
    type: 'password',
    validation: zValidator.string().min(12).max(60),
    placeholder: 'password'
  }
]
