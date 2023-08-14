import { type TInputForm } from '@/models/UI'
import { lazy } from 'react'
import { type UseFormRegisterReturn } from 'react-hook-form'

const DropZone = lazy(() => import('@/components/Form/components/DropZone'))
const TextArea = lazy(() => import('@/components/Form/components/TextArea'))
const TextField = lazy(() => import('@/components/Form/components/TextField'))

interface IProps {
  data: TInputForm
  register: UseFormRegisterReturn<string>
  error: string
}

export const DeterminateInput: React.FC<IProps> = ({ data, register, error }) => {
  if (data.formInputType === 'textField') {
    return <TextField data={data} register={register} error={error} />
  }
  if (data.formInputType === 'textArea') {
    return <TextArea data={data} register={register} error={error}/>
  }
  if (data.formInputType === 'dropZone') {
    return <DropZone data={data} register={register} error={error}/>
  }

  return <h1>Invalid input type</h1>
}
