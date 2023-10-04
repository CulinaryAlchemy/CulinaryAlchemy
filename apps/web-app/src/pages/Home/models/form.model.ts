import { type TFormInputArray } from '@/components/Form/models'
import { getDynamicSchemas } from '@/utils'
import { z as zValidator } from 'zod'


export const homeInputsArrayMain: TFormInputArray = [
  {
    formInputType: 'textField',
    label: 'Recipe title',
    name: 'title',
    placeholder: 'La mue cream',
    async: false,
    type: 'text',
    validation: zValidator.string().min(10).max(50)
  },
  {
    formInputType: 'textArea',
    label: 'Recipe description',
    name: 'description',
    placeholder: 'I\'ve prepare a ...',
    validation: zValidator.string().min(10).max(150)
  },
  {
    formInputType: 'textField',
    label: 'Author notes',
    name: 'authors_notes',
    placeholder: 'Don\'t use lemon',
    async: false,
    type: 'text',
    validation: zValidator.string().min(10).max(50).optional()
  },
  {
    formInputType: 'textField',
    label: 'Cooking time',
    name: 'cooking_time',
    placeholder: '7',
    async: false,
    type: 'text',
    validation: zValidator.string().min(1).max(7)
  },
  {
    formInputType: 'textField',
    label: 'Servings',
    name: 'servings',
    placeholder: 'servings',
    async: false,
    type: 'text',
    validation: zValidator.string().min(5).max(70)
  },
  {
    formInputType: 'textField',
    label: 'Equipment needed',
    name: 'equipment_needed',
    placeholder: 'knife, meal, etc...',
    async: false,
    type: 'text',
    validation: zValidator.string().min(5).max(70)
  },
  {
    formInputType: 'textField',
    label: 'Ingredients',
    name: 'ingredients',
    placeholder: 'lemon, meal, salt, etc...',
    async: false,
    type: 'text',
    validation: zValidator.string().min(5).max(70)
  },
  {
    formInputType: 'textField',
    label: 'Spices',
    name: 'spices',
    placeholder: 'lemon, meal, salt, etc...',
    async: false,
    type: 'text',
    validation: zValidator.string().min(5).max(70).optional()
  },
  {
    formInputType: 'textField',
    label: 'Youtube link',
    name: 'youtube_link',
    placeholder: 'lemon, meal, salt, etc...',
    async: false,
    type: 'text',
    validation: zValidator.string().min(5).max(70).refine((value) => value.trim().includes('www.youtube.com'), { message: 'Invalid url' }).optional()
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
      .refine((files: Array<{ size: number }>) => Array.from(files).every((file) => file?.size <= 50000), 'Max image size is 5MB.'),
    accept: 'image/jpeg, image/jpg, image/png, image/webp',
    type: 'file',
    maxFiles: 4
  }
]

const homeInputsArray: TFormInputArray = [
  ...homeInputsArrayMain,
  ...homeInputsArrayFooter
]

const dynamicInputsSchemas = getDynamicSchemas(homeInputsArray)

export const homeInputsSchema = zValidator.object(dynamicInputsSchemas)
