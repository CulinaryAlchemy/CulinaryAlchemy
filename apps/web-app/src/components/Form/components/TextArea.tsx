import { Error } from '@/components/Form/components/'
import { type TTextAreaForm } from '@/models/UI'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Textarea from '@mui/joy/Textarea'
import { type UseFormRegisterReturn } from 'react-hook-form'

interface IProps {
  data: TTextAreaForm
  error: string
  register: UseFormRegisterReturn<string>
}

const TextArea: React.FC<IProps> = ({ data, error, register }) => {
  return (
    <FormControl>
      <FormLabel>{data.label}</FormLabel>
      <Textarea {...register} {...(error !== '' && { error: true })} placeholder="Placeholder" minRows={2} />
      <Error text={error} />
    </FormControl>
  )
}

export default TextArea
