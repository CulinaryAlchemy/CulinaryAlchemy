import { type TInputsFormData } from '@/models/types'

export const getDynamicSchemas = (inputsFormData: TInputsFormData) => {
  let tempSchemas = {}

  inputsFormData.forEach((inputData) => {
    tempSchemas = { ...tempSchemas, [inputData.name]: inputData.validation }
  })

  return tempSchemas
}

