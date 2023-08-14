import { Trans } from 'react-i18next'
import { z as zValidator, type ZodType } from 'zod'

export type TFormInputType = 'textField' | 'textArea' | 'dropZone'


interface IBaseInputForm {
  name: string
  label: JSX.Element
  validation: ZodType
  required: boolean
}

interface ITextFieldForm {
  type: 'text' | 'password' | 'email' | 'date'
  formInputType: 'textField'
  placeholder: string
}

interface ITextAreaForm {
  formInputType: 'textArea'
  placeholder: string
}

interface IDropZoneForm {
  formInputType: 'dropZone'
  accept: string
  type: 'file'
}

export type TInputForm = IBaseInputForm & (ITextFieldForm | ITextAreaForm | IDropZoneForm)

export type TTextFieldForm = IBaseInputForm & ITextFieldForm
export type TTextAreaForm = IBaseInputForm & ITextAreaForm
export type TDropZoneForm = IBaseInputForm & IDropZoneForm

export type TFormInputRecordObject = Record<string, TInputForm>
export type TFormInputArray = TInputForm[]

export const CInputUser: TFormInputRecordObject = {
  username: {
    name: 'username',
    label: <Trans>username</Trans>,
    type: 'text',
    validation: zValidator.string().min(3).refine((value) => value === value.toLowerCase(), { message: 'String must be in lower case' }),
    placeholder: 'Joe Bass',
    formInputType: 'textField',
    required: true
  },
  email: {
    name: 'email',
    label: <Trans>email</Trans>,
    type: 'email',
    validation: zValidator.string().email().min(4).max(254),
    placeholder: 'joe@gmail.com',
    formInputType: 'textField',
    required: true
  },
  password: {
    name: 'password',
    label: <Trans>password</Trans>,
    type: 'password',
    validation: zValidator.string().min(12).max(60),
    placeholder: 'wua-wau78',
    formInputType: 'textField',
    required: true
  },
  avatar: {
    name: 'avatar',
    label: <Trans>avatar</Trans>,
    type: 'file',
    validation: zValidator
      .any()
      .refine((files: Array<{ size: number }>) => files[0]?.size <= 500000, 'Max image size is 5MB.')
      .refine(
        (files: Array<{ size: number, type: string }>) => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(files?.[0]?.type),
        'Only .jpg, .jpeg, .png and .webp formats are supported.'
      ),
    formInputType: 'dropZone',
    required: true,
    accept: 'image/jpeg, image/jpg, image/png, image/webp'
  },
  description: {
    name: 'description',
    label: <Trans>description</Trans>,
    validation: zValidator.string().min(12).max(60),
    placeholder: 'Hi, I am Chuck Bass and i like cats :3',
    formInputType: 'textArea',
    required: true
  },
  location: {
    name: 'location',
    label: <Trans>location</Trans>,
    type: 'text',
    validation: zValidator.string().min(12).max(60),
    placeholder: 'Toronto',
    formInputType: 'textField',
    required: true
  }
}
