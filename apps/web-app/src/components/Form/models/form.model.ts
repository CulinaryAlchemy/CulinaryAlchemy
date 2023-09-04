import { type TUserKey } from '@/models/LOGIC'
import { type ZodType } from 'zod'

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
