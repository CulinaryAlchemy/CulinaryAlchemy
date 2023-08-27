import { type TInputForm } from '@/models/UI'
import { lazy } from 'react'
import { type FieldValues, type UseFormClearErrors, type UseFormRegisterReturn, type UseFormSetError, type UseFormWatch } from 'react-hook-form'

const DropZone = lazy(() => import('@/components/Form/components/DropZone'))
const TextArea = lazy(() => import('@/components/Form/components/TextArea'))
const TextField = lazy(() => import('@/components/Form/components/TextField'))
const TextFieldAsync = lazy(() => import('@/components/Form/components/TextFieldAsync'))

interface IProps {
  data: TInputForm
  register: UseFormRegisterReturn<string>
  error: string
  watch: UseFormWatch<FieldValues>
  setError: UseFormSetError<FieldValues>
  clearErrors: UseFormClearErrors<FieldValues>
}

export const DeterminateInput: React.FC<IProps> = ({ data, register, error, watch, setError, clearErrors }) => {
  if (data.formInputType === 'textField') {
    return <TextField {...{ data, register, error }} />
  }
  if (data.formInputType === 'textArea') {
    return <TextArea {...{ data, register, error }}/>
  }
  if (data.formInputType === 'dropZone') {
    return <DropZone {...{ data, register, error }}/>
  }
  if (data.formInputType === 'textFieldAsync') {
    return <TextFieldAsync {...{ data, register, error, watch, setError, clearErrors }} />
  }

  return <h1>Invalid input type</h1>
}
