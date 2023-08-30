import { type TUserKey } from '@/models/LOGIC'
import { Trans } from 'react-i18next'
import { z as zValidator, type ZodType } from 'zod'

export type TFormInputType = 'textField' | 'textFieldAsync' | 'textArea' | 'dropZone' | 'textFieldFetch'

export type TOnInput = 'onChange' | 'onSubmit' | 'onBlur'

interface IBaseInputForm {
  name: TUserKey
  label: JSX.Element
  validation: ZodType
  validationsOn?: TOnInput
  defaultValue?: string
}

interface ITextFieldForm {
  type: 'text' | 'password' | 'email' | 'date'
  formInputType?: 'textField'
  placeholder: string
}

interface ITextFieldAsyncForm {
  type: 'text' | 'password' | 'email' | 'date'
  formInputType?: 'textFieldAsync'
  placeholder: string
}

export interface ITextAreaForm {
  formInputType: 'textArea'
  placeholder: string
}

interface IDropZoneForm {
  formInputType: 'dropZone'
  accept: string
  type: 'file'
}

export type TInputForm = IBaseInputForm & (ITextFieldForm | ITextAreaForm | IDropZoneForm | ITextFieldAsyncForm)

export type TTextFieldForm = IBaseInputForm & ITextFieldForm
export type TTextAreaForm = IBaseInputForm & ITextAreaForm
export type TDropZoneForm = IBaseInputForm & IDropZoneForm
export type TTextFieldAsyncForm = IBaseInputForm & ITextFieldAsyncForm

export type TFormInputRecordObject = Record<string, TInputForm>
export type TFormInputArray = TInputForm[]

export const CInputUser: TFormInputRecordObject = {
  username: {
    name: 'username',
    label: <Trans>username</Trans>,
    type: 'text',
    validation: zValidator
      .string()
      .min(1)
      .max(15)
      .refine((value) => value === value.toLowerCase(), { message: 'String must be in lower case' }),
    placeholder: 'Joe Bass',
    formInputType: 'textFieldAsync'
  },
  email: {
    name: 'email',
    label: <Trans>email</Trans>,
    type: 'email',
    validation: zValidator
      .string()
      .min(4)
      .max(320)
      .email(),
    placeholder: 'joe@gmail.com'
  },
  password: {
    name: 'password',
    label: <Trans>password</Trans>,
    type: 'password',
    validation: zValidator.string().min(12).max(60),
    placeholder: 'wua-wau78',
    formInputType: 'textField'
  },
  description: {
    name: 'description',
    label: <Trans>description</Trans>,
    validation: zValidator.string().min(1).max(150),
    placeholder: 'Hi, I am Chuck Bass and i like cats :3',
    formInputType: 'textArea'
  },
  location: {
    name: 'location',
    label: <Trans>location</Trans>,
    type: 'text',
    validation: zValidator.string().min(1).max(30),
    placeholder: 'Toronto',
    formInputType: 'textField'
  },
  avatar: {
    name: 'avatar',
    label: <Trans>avatar</Trans>,
    type: 'file',
    validation: zValidator
      .custom<File[]>()
      .refine((files: Array<{ size: number }>) => files[0] != null ? files[0]?.size <= 500000 : true, 'Max image size is 5MB.')
      .refine(
        (files: Array<{ size: number, type: string }>) => files[0] != null ? ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(files[0]?.type) : true,
        'Only .jpg, .jpeg, .png and .webp formats are supported.'
      ).optional(),
    formInputType: 'dropZone',
    accept: 'image/jpeg, image/jpg, image/png, image/webp',
    defaultValue: undefined
  }
}
