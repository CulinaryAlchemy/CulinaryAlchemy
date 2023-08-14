import { type TFormInputArray } from '@/models/UI'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type FieldValues, type SubmitHandler } from 'react-hook-form'
import { type ZodObject, type ZodRawShape } from 'zod'

import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button/'
import Sheet from '@mui/joy/Sheet/'
import { Suspense } from 'react'
import { DeterminateInput } from './components'

interface IStyles {
  gridColumns: 1 | 2
}

interface IForm {
  schema: ZodObject<ZodRawShape>
  inputsData: TFormInputArray
  onSumbit: SubmitHandler<FieldValues>
  Header?: React.ReactNode
  Footer?: React.ReactNode
  buttonSumbitName: string
  styles: IStyles
}

const gridFormStyles1 = { display: 'grid', gridTemplateColumns: '1fr', gap: '0.1em' }
const gridFormStyles2 = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1em' }

export const Form: React.FC<IForm> = ({ schema, inputsData, onSumbit, Header, Footer, buttonSumbitName = 'sumbit', styles }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) })

  return (
    <Sheet variant='outlined'
      sx={{
        width: 300,
        mx: 'auto',
        my: 4,
        py: 3,
        px: 2,
        borderRadius: 'sm',
        boxShadow: 'md'
      }}
    >
      <form onSubmit={handleSubmit(onSumbit)} noValidate>
        <Sheet sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}>
          {Header}
          <main>
            <Suspense>
              <Box sx={styles.gridColumns === 1 ? gridFormStyles1 : gridFormStyles2}>
                {inputsData.map((inputData) => (
                  <DeterminateInput
                    data={inputData}
                    register={register(inputData.name)}
                    error={errors[inputData.name] != null ? errors[inputData.name]?.message as string : ''}
                  />
                ))}
              </Box>
            </Suspense>
            <Button type='submit' sx={{ marginTop: '1em', width: '100%' }}>{buttonSumbitName}</Button>
          </main>
          {Footer}
        </Sheet>
      </form>
    </Sheet>
  )
}
