import { type TFormInputRecordObject } from '@/components/Form/models'
import { Trans } from 'react-i18next'
import { z as zValidator } from 'zod'

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
    formInputType: 'textField',
    async: true
  },
  name: {
    name: 'name',
    label: <Trans>name</Trans>,
    type: 'text',
    validation: zValidator
      .string()
      .min(1)
      .max(30)
      .refine((value) => value === value.toLowerCase(), { message: 'String must be in lower case' }),
    placeholder: 'Jowi',
    formInputType: 'textField',
    async: false
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
    placeholder: 'joe@gmail.com',
    formInputType: 'textField',
    async: false
  },
  password: {
    name: 'password',
    label: <Trans>password</Trans>,
    type: 'password',
    validation: zValidator.string().min(12).max(60),
    placeholder: 'wua-wau78',
    formInputType: 'textField',
    async: false
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
    formInputType: 'textField',
    async: false
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
