import { CInputUser, type TFormInputArray } from '@/models/UI'
import { checkApiUserKey } from '@/services'
import { getDynamicSchemas } from '@/utils'
import { z as zValidator } from 'zod'

export const inputsArray: TFormInputArray = [
  {
    ...CInputUser.username,
    validation: CInputUser.username.validation
      .refine(async (value) => (await checkApiUserKey('username', value as string)).status === 200, { message: 'Username isn\'t available' })
  },
  {
    ...CInputUser.email,
    validation: CInputUser.email.validation
      .refine(async (value) => (await checkApiUserKey('email', value as string)).status === 200, { message: 'Email isn\'t available ' })
  },
  CInputUser.password
]

const dynamicInputsSchemas = getDynamicSchemas(inputsArray)

export const registerInputsSchema = zValidator.object(dynamicInputsSchemas)
