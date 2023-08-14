import { type TFormInputArray } from '@/models/UI'

export const getDynamicSchemas = (inputsFormData: TFormInputArray) => {
  let tempSchemas = {}

  inputsFormData.forEach((inputData) => {
    tempSchemas = { ...tempSchemas, [inputData.name]: inputData.validation }
  })

  return tempSchemas
}

