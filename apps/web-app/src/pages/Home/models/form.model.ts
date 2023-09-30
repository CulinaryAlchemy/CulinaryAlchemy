import { type TFormInputArray } from '@/components/Form/models'
import { getDynamicSchemas } from '@/utils'
import { z as zValidator } from 'zod'


export const homeInputsArrayMain: TFormInputArray = [
  {
    formInputType: 'textArea',
    label: 'What have u prepared today?',
    name: 'title',
    placeholder: 'I\'ve prepare a ...',
    validation: zValidator.string().min(10).max(50)
  }
]

export const homeInputsArrayFooter: TFormInputArray = [
  {
    formInputType: 'dropZone',
    label: 'images',
    name: 'images-dropzone',
    validation: zValidator.custom<File[]>()
      .refine(
        (files: Array<{ size: number, type: string }>) => files[0] != null ? ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(files[0]?.type) : true,
        'Only .jpg, .jpeg, .png and .webp formats are supported.'
      )
      .refine((files: Array<{ size: number }>) => files[0] != null ? files[0]?.size <= 5000000 : true, 'Max image size is 5MB.')
      .optional(),
    accept: 'image/jpeg, image/jpg, image/png, image/webp',
    type: 'file'
  }
]

const homeInputsArray: TFormInputArray = [
  ...homeInputsArrayMain,
  ...homeInputsArrayFooter
]

const dynamicInputsSchemas = getDynamicSchemas(homeInputsArray)

export const homeInputsSchema = zValidator.object(dynamicInputsSchemas)
