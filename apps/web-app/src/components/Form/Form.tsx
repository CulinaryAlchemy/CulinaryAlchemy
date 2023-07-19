import { type TInputsFormData } from '@/types'
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
  onSumbit: () => void
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
        mx: 'auto', // margin left & right
        my: 4, // margin top & bottom
        py: 3, // padding top & bottom
        px: 2, // padding left & right
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

/* import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { ZodObject, ZodRawShape, z as zValidator } from 'zod'

const schemaForm = zValidator.object({
  name: zValidator.string().min(3),
  id: zValidator.coerce.number().positive().finite().safe().min(2)
}).strict({ message: '*.* What are u trying? *.*' }) */

/* type TForm = zValidator.infer<typeof schemaForm>

export const Form = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<TForm>({
    resolver: zodResolver(schemaForm)
  })

  const onSubmit: SubmitHandler<TForm> = (data) => { console.log(data) }

  console.log(errors)
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...(register('name'))} />
      {((errors?.name) != null) && errors.name.message}
      <input type="text" {...(register('id', { required: 'Please enter a password' }))} />
      {((errors?.id) != null) && errors.id.message}
      <button>aaa</button>
    </form>)
  // Agregar login and register pages, and use Form to avoid reply code
}
 */
