import { CInputUser, type TFormInputArray } from '@/models/UI'
import { getDynamicSchemas } from '@/utils'
import { z as ZValidator } from 'zod'

export const inputsArray: TFormInputArray = Object.values(CInputUser)

const dynamicInputsSchemas = getDynamicSchemas(inputsArray)

export const inputsAccountTabSchema = ZValidator.object(dynamicInputsSchemas).deepPartial()
