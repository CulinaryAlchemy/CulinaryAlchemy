import { type TInputsFormData } from '@/models/UI'

export const getDynamicSchemas = (inputsFormData: TInputsFormData) => {
  let tempSchemas = {}

  inputsFormData.forEach((inputData) => {
    tempSchemas = { ...tempSchemas, [inputData.name]: inputData.validation }
  })

  return tempSchemas
}

