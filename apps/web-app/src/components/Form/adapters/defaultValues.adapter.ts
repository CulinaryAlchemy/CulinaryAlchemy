import { type TFormInputArray } from '@/models/UI'

export const adaptDefaultValues = (inputsData: TFormInputArray) => {
  let newInputs = {}

  let newInput
  inputsData.forEach((inputData) => {
    newInput = {
      ...newInputs,
      [inputData.name]: inputData?.defaultValue ?? undefined
    }

    newInputs = newInput
  })

  return newInputs
}
