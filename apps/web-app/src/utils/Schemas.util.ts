import { type TInputsFormData } from '@/types'

export const getDynamicSchemas = (inputsFormData: TInputsFormData) => {
  let tempSchemas = {}

  inputsFormData.forEach((inputData) => {
    tempSchemas = { ...tempSchemas, [inputData.name]: inputData.validation }
  })

  return tempSchemas
}

