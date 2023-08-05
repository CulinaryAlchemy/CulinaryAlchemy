import { t } from 'i18next'
import { type HTMLInputTypeAttribute } from 'react'
import { z as zValidator, type ZodType } from 'zod'

export interface IInputFormData {
  name: string
  label: string
  placeholder: string
  type: HTMLInputTypeAttribute
  validation: ZodType
}

export type TInputsFormData = IInputFormData[]


export const CInputUser = {
  username: {
    name: 'username',
    label: t('register.form.main.inputs.userName'),
    type: 'text',
    validation: zValidator.string().min(3).refine((value) => value === value.toLowerCase(), { message: 'String must be in lower case' }),
    placeholder: 'Joe Bass'
  },
  email: {
    name: 'email',
    label: t('register.form.main.inputs.email'),
    type: 'email',
    validation: zValidator.string().email().min(4).max(254),
    placeholder: 'joe@gmail.com'
  },
  password: {
    name: 'password',
    label: t('register.form.main.inputs.password'),
    type: 'password',
    validation: zValidator.string().min(12).max(60),
    placeholder: 'wua-wau78'
  }
}
