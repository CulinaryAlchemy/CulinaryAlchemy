import { type HTMLInputTypeAttribute } from 'react'
import { Trans } from 'react-i18next'
import { z as zValidator, type ZodType } from 'zod'

export interface IInputFormData {
  name: string
  label: React.ReactNode
  placeholder: string
  type: HTMLInputTypeAttribute
  validation: ZodType
}

export type TInputsFormData = IInputFormData[]


export const CInputUser = {
  username: {
    name: 'username',
    label: <Trans>username</Trans>,
    type: 'text',
    validation: zValidator.string().min(3).refine((value) => value === value.toLowerCase(), { message: 'String must be in lower case' }),
    placeholder: 'Joe Bass'
  },
  email: {
    name: 'email',
    label: <Trans>email</Trans>,
    type: 'email',
    validation: zValidator.string().email().min(4).max(254),
    placeholder: 'joe@gmail.com'
  },
  password: {
    name: 'password',
    label: <Trans>password</Trans>,
    type: 'password',
    validation: zValidator.string().min(12).max(60),
    placeholder: 'wua-wau78'
  }
}
