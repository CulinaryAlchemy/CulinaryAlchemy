import { type TFormInputArray } from '@/components/Form/models'
import { getDynamicSchemas } from '@/utils'
import { z as zValidator } from 'zod'

export const stepViewerInputsArray: TFormInputArray = [
  {
    name: 'stepName',
    formInputType: 'textField',
    async: false,
    label: 'Step title',
    placeholder: 'LA PASTE CREAM',
    validation: zValidator.string(),
    type: 'text'
  },
  {
    name: 'stepDescription',
    formInputType: 'textArea',
    label: 'Step title',
    placeholder: 'La cream porche',
    validation: zValidator.string()
  }
]

const dynamicStepViewerInputsSchemas = getDynamicSchemas(stepViewerInputsArray)

export const stepViewerInputsSchema = zValidator.object(dynamicStepViewerInputsSchemas)
