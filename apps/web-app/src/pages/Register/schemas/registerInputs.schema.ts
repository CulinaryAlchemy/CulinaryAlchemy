import { getDynamicSchemas } from '@/utils'
import { z as zValidator } from 'zod'
import { inputsData } from '../consts'

const registerInputs = getDynamicSchemas(inputsData)

export const registerInputsSchema = zValidator.object(registerInputs)
