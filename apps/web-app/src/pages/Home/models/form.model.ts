import { type TFormInputArray } from '@/components/Form/models'
import { getDynamicSchemas } from '@/utils'
import { z as zValidator } from 'zod'


export const homeInputsArrayMain: TFormInputArray = [
  {
    formInputType: 'textField',
    label: 'Recipe title',
    name: 'title',
    placeholder: 'Delicious Pasta Barbonara',
    async: false,
    type: 'text',
    validation: zValidator.string().min(3).max(70)
  },
  {
    formInputType: 'textArea',
    label: 'Recipe description',
    name: 'description',
    placeholder: 'A classic Italian dish with creamy sauce...',
    validation: zValidator.string().max(255)
  }
]

export const homeInputsArrayOptionals: TFormInputArray = [
  {
    formInputType: 'textArea',
    label: 'Author notes',
    name: 'authors_notes',
    placeholder: 'Don\'t use lemon, Tip for extra flavor ...',
    validation: zValidator.string().min(20).max(255).optional()
  },
  {
    formInputType: 'textField',
    label: 'Cooking time',
    name: 'cooking_time',
    placeholder: '30',
    async: false,
    type: 'text',
    validation: zValidator.coerce.number({ invalid_type_error: 'Only numbers are allowed' }).min(0).max(180).optional()
  },
  {
    formInputType: 'textField',
    label: 'Servings',
    name: 'servings',
    placeholder: '4',
    async: false,
    type: 'text',
    validation: zValidator.coerce.number({ invalid_type_error: 'Only numbers are allowed' }).min(1).max(100).optional()
  },
  {
    formInputType: 'textField',
    label: 'Equipment needed',
    name: 'equipment_needed',
    placeholder: 'Knife, pot, cutting board...',
    async: false,
    type: 'text',
    validation: zValidator.string().min(1).max(12).optional()
  },
  {
    formInputType: 'textField',
    label: 'Ingredients',
    name: 'ingredients',
    placeholder: 'Pasta, eggs, bacon, Parmesan cheese...',
    async: false,
    type: 'text',
    validation: zValidator.string().min(1).max(12).optional()
  },
  {
    formInputType: 'textField',
    label: 'Spices',
    name: 'spices',
    placeholder: 'Salt, pepper, garlic powder...',
    async: false,
    type: 'text',
    validation: zValidator.string().min(1).max(10).optional()
  },
  {
    formInputType: 'textField',
    label: 'Youtube link',
    name: 'youtube_link',
    placeholder: 'https://www.youtube.com/watch?v=_GuOjXYl5ew',
    async: false,
    type: 'text',
    validation: zValidator.string().min(5).max(70).refine((value) => value.trim().startsWith('https://www.youtube.com/watch?v='), { message: 'Invalid url' }).optional()
  }
]

export const homeInputsArrayFooter: TFormInputArray = [
  {
    formInputType: 'dropZone',
    label: 'images',
    name: 'images-dropzone',
    validation: zValidator.instanceof(FileList, { message: 'Upload your recipe images' })
      .refine((files) => files[0] != null, { message: 'Upload your recipe images' })
      .refine((files) => files.length <= 4, { message: 'Max 4 images per recipe' })
      .refine(
        (files) => Array.from(files).every(file => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)),
        'Only .jpg, .jpeg, .png and .webp formats are supported.'
      )
      .refine((files) => Array.from(files).every((file) => file?.size <= 5000000), 'The maximum image size for each image is 5MB.'),
    accept: 'image/jpeg, image/jpg, image/png, image/webp',
    type: 'file',
    maxFiles: 4
  }
]

const homeInputsArray: TFormInputArray = [
  ...homeInputsArrayMain,
  ...homeInputsArrayOptionals,
  ...homeInputsArrayFooter
]

const dynamicInputsSchemas = getDynamicSchemas(homeInputsArray)

export const homeInputsSchema = zValidator.object(dynamicInputsSchemas)
