import { CInputUser, type TFormInputArray } from '@/models/UI'
import { getDynamicSchemas } from '@/utils'
import { z as zValidator } from 'zod'

export const inputsArray: TFormInputArray = [
  CInputUser.username, CInputUser.email, CInputUser.password
]

const dynamicInputsSchemas = getDynamicSchemas(inputsArray)

export const registerInputsSchema = zValidator.object(dynamicInputsSchemas)
