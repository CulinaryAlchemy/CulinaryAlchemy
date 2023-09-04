import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Input from '@mui/joy/Input'
import { type UseFormRegisterReturn } from 'react-hook-form'

import { Error } from '@/components/Form/components/'
import { type TTextFieldForm } from '@/components/Form/models/'

interface IProps {
  data: TTextFieldForm
  error: string
  register: UseFormRegisterReturn<string>
}

const TextField: React.FC<IProps> = ({ data, error, register }) => {
  return (
    <FormControl key={data.name} sx={{ marginBottom: '0.5em' }}>
      <FormLabel>{data.label}</FormLabel>
      <Input
        sx={{
          Width: '1px',
          '--Input-minWidth': '1px'
        }}
        defaultValue={data.defaultValue}
        type={data.type}
        placeholder={data.placeholder}
        {...(error !== '' && { error: true })}
        {...register}
      />
      <Error text={error} />
    </FormControl>
  )
}

export default TextField
