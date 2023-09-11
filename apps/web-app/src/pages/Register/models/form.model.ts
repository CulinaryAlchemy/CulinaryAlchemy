import { type TFormInputArray } from '@/components/Form/models'
import { CInputUser } from '@/models/UI'
import { getDynamicSchemas } from '@/utils'
import { z as zValidator } from 'zod'

export const inputsArray: TFormInputArray = [
  {
    ...CInputUser.username,
    validation: CInputUser.username.validation
  },
  {
    ...CInputUser.email,
    // @ts-expect-error ts does not allow this by our types : (
    async: true
  },
  CInputUser.password
]

const dynamicInputsSchemas = getDynamicSchemas(inputsArray)

export const registerInputsSchema = zValidator.object(dynamicInputsSchemas)
