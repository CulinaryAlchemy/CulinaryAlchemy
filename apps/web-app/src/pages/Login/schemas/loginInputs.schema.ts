import { inputsData } from '@/pages/Login/consts'
import { getDynamicSchemas } from '@/utils'
import { z as zValidator } from 'zod'

const loginInputs = getDynamicSchemas(inputsData)

export const loginInputsSchema = zValidator.object(loginInputs)
