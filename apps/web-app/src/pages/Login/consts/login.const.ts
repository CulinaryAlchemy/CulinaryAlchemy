import { type TInputsFormData } from '@/types'
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
    validation: zValidator.string().min(5).max(30)
  }
]
