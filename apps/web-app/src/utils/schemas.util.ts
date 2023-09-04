import { type TFormInputArray } from '@/components/Form/models'

export const getDynamicSchemas = (inputsFormData: TFormInputArray) => {
  let tempSchemas = {}

  inputsFormData.forEach((inputData) => {
    tempSchemas = { ...tempSchemas, [inputData.name]: inputData.validation }
  })

  return tempSchemas
}

