import { type TInputForm } from '@/components/Form/models'
import { type IInputStyles } from '@/models/UI'
import { lazy } from 'react'
import { type UseFormRegisterReturn } from 'react-hook-form'

const DropZone = lazy(() => import('@/components/Form/components/DropZone/DropZone'))
const TextArea = lazy(() => import('@/components/Form/components/TextArea'))
const TextField = lazy(() => import('@/components/Form/components/TextField'))
const TextFieldAsync = lazy(() => import('@/components/Form/components/TextFieldAsync'))
const CheckBox = lazy(() => import('@/components/Form/components/CheckBox'))

interface IInputsStyles {
  textArea?: IInputStyles
  textField?: IInputStyles
}

interface IProps {
  data: TInputForm
  register: UseFormRegisterReturn<string>
  error: string
  inputStyles?: IInputsStyles
  areInputsReadOnly?: boolean
}

export const DeterminateInput: React.FC<IProps> = ({ areInputsReadOnly = false, data, register, error, inputStyles }) => {
  if (data.formInputType === 'textField' && data.async) {
    return <TextFieldAsync {...{ data, register, error, isReadOnly: areInputsReadOnly }} />
  }
  if (data.formInputType === 'textField') {
    return <TextField {...{ data, register, error, styles: inputStyles?.textField, isReadOnly: areInputsReadOnly }} />
  }
  if (data.formInputType === 'textArea') {
    return <TextArea {...{ data, register, error, styles: inputStyles?.textArea, isReadOnly: areInputsReadOnly }}/>
  }
  if (data.formInputType === 'dropZone') {
    return <DropZone {...{ data, register, error }}/>
  }
  if (data.formInputType === 'checkbox') {
    return <CheckBox {...{ data, register }}/>
  }

  return <h1>Form library: Invalid input type</h1>
}
