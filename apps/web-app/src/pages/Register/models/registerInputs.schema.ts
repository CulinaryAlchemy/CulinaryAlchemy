import { inputsData } from '@/pages/Register/models'
import { getDynamicSchemas } from '@/utils'
import { z as zValidator } from 'zod'

const registerInputs = getDynamicSchemas(inputsData)

export const registerInputsSchema = zValidator.object(registerInputs)
