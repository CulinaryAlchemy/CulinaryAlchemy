import { type TInputsFormData } from '@/types'
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
    validation: zValidator.string().email(),
    placeholder: 'example@gmail.com'
  },
  {
    name: 'password',
    type: 'password',
    validation: zValidator.string().min(5).max(30),
    placeholder: 'password'
  }
]
