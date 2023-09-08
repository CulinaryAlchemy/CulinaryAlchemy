import { type TFormInputArray } from '@/components/Form/models'
import { getDynamicSchemas } from '@/utils'
import { z as zValidator } from 'zod'


export const homeInputsArray: TFormInputArray = [
  {
    formInputType: 'textArea',
    label: 'What have u prepared today?',
    name: 'post-area',
    placeholder: 'I\'ve prepare a ...',
    validation: zValidator.string().min(10).max(50)
  }
]

const dynamicInputsSchemas = getDynamicSchemas(homeInputsArray)

export const homeInputsSchema = zValidator.object(dynamicInputsSchemas)
