import { type TFormInputArray } from '@/components/Form/models'
import { CInputUser } from '@/models/UI'
import { getDynamicSchemas } from '@/utils'
import { z as ZValidator } from 'zod'

export const selectedInputsArray: TFormInputArray = [
  CInputUser.username,
  CInputUser.name,
  {
    formInputType: 'textFieldAsync',
    ...CInputUser.email
  },
  CInputUser.description,
  CInputUser.location
]


const dynamicInputsSchemas = getDynamicSchemas(selectedInputsArray)

export const inputsAccountTabSchema = ZValidator.object(dynamicInputsSchemas).deepPartial()
