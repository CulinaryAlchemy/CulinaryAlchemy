import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Input from '@mui/joy/Input'
import { type UseFormRegisterReturn } from 'react-hook-form'

import { Error } from '@/components/Form/components/'
import { type TDropZoneForm } from '@/models/UI'

interface IProps {
  data: TDropZoneForm
  error: string
  register: UseFormRegisterReturn<string>
}

const DropZone: React.FC<IProps> = ({ data, error, register }) => {
  return (
    <FormControl key={data.name} sx={{ marginBottom: '0.5em' }}>
      <FormLabel>{data.label}</FormLabel>
      <Input
        type={data.type}
        {...(error !== '' && { error: true })}
        {...register}
        sx={{
          'input[type="file"]': {
            width: '100%'
          }
        }}
      />
      <Error text={error} />
    </FormControl>
  )
}

export default DropZone
