import { type TUserKey } from '@/models/LOGIC'
import { type ZodType } from 'zod'

export type TFormInputType = 'textField' | 'textArea' | 'dropZone' | 'textFieldFetch' | 'checkbox'

export type TOnInput = 'onChange' | 'onSubmit' | 'onBlur'

interface IBaseInputForm {
  name: TUserKey | string
  label: JSX.Element | string
  validation: ZodType
  validationsOn?: TOnInput
  defaultValue?: unknown
}

interface ITextFieldForm {
  type: 'text' | 'password' | 'email' | 'date'
  formInputType: 'textField'
  placeholder: string
  async: boolean
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

interface ICheckBoxForm {
  formInputType?: 'checkbox'
}

export type TInputForm = IBaseInputForm & (ITextFieldForm | ITextAreaForm | IDropZoneForm | ICheckBoxForm)

export type TTextFieldForm = IBaseInputForm & ITextFieldForm
export type TTextAreaForm = IBaseInputForm & ITextAreaForm
export type TDropZoneForm = IBaseInputForm & IDropZoneForm
export type TCheckBoxForm = IBaseInputForm & ICheckBoxForm

export type TFormInputRecordObject = Record<string, TInputForm>
export type TFormInputArray = Array<TTextFieldForm | TTextAreaForm | TDropZoneForm | TCheckBoxForm>
