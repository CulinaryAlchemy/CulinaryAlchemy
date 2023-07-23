import { type TInputsFormData } from '@/models/'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { type ZodObject, type ZodRawShape } from 'zod'

import Button from '@mui/joy/Button/'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Input from '@mui/joy/Input'
import Sheet from '@mui/joy/Sheet/'
import Typography from '@mui/joy/Typography'

interface IForm {
  schema: ZodObject<ZodRawShape>
  inputsData: TInputsFormData
  onSumbit: (data: any) => void
  Header: React.ReactNode
  Footer: React.ReactNode
  buttonSumbitName: string
}

export const Form: React.FC<IForm> = ({ schema, inputsData, onSumbit, Header, Footer, buttonSumbitName = 'sumbit' }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) })

  return (
    <Sheet variant='outlined'
      sx={{
        width: 300,
        mx: 'auto',
        my: 4,
        py: 3,
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        borderRadius: 'sm',
        boxShadow: 'md'
      }}
    >
      <form onSubmit={handleSubmit(onSumbit)}>
        <Sheet sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}>
          {Header}
          <main>
            {inputsData.map((inputData) => (
              <FormControl key={inputData.name}>
                <FormLabel sx={{ textTransform: 'capitalize' }}>{inputData.name}</FormLabel>
                <Input
                  type={inputData.type}
                  placeholder={inputData.placeholder}
                  {...(errors[inputData.name] != null && { error: true })}
                  {...register(inputData.name)}
                />
                <Typography
                  level="body3"
                  color='danger'
                  sx={{ alignSelf: 'flex-end' }}
                >
                  {
                    errors[inputData.name] != null && errors[inputData.name]?.message as string
                  }
                </Typography>
              </FormControl>
            ))}
            <Button type='submit' sx={{ marginTop: '1em', width: '100%', textTransform: 'capitalize' }}>{buttonSumbitName}</Button>
          </main>
          {Footer}
        </Sheet>
      </form>
    </Sheet>
  )
}
