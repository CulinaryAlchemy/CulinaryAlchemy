import { type TFormInputArray } from '@/models/UI'
import { DeterminateInput } from './components'

import { zodResolver } from '@hookform/resolvers/zod'
import { Suspense, useEffect, type SyntheticEvent } from 'react'
import { useForm, type FieldValues, type SubmitHandler } from 'react-hook-form'
import { type ZodObject, type ZodRawShape } from 'zod'

import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button/'
import CircularProgress from '@mui/joy/CircularProgress'
import Sheet from '@mui/joy/Sheet/'

interface IStyles {
  gridColumns: 1 | 2
  width: string
  border?: 'none'
  paddingY?: string
  marginY?: string
}

interface IForm {
  schema: ZodObject<ZodRawShape>
  inputsData: TFormInputArray
  onSubmit: SubmitHandler<FieldValues>
  Header?: React.ReactNode
  Footer?: React.ReactNode
  buttonSubmitName: string
  styles: IStyles
}

const gridFormStyles1 = { display: 'grid', gridTemplateColumns: '1fr', gap: '0.1em' }
const gridFormStyles2 = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1em' }

export const Form: React.FC<IForm> = ({ schema, inputsData, onSubmit, Header, Footer, buttonSubmitName = 'submit', styles }) => {
  const { register, handleSubmit, watch, setError, clearErrors, formState: { errors, isSubmitting, isSubmitted } } = useForm<FieldValues>({ mode: 'onChange', resolver: zodResolver(schema, { async: true }, { mode: 'async' }) })

  useEffect(() => {
    console.log({ isSubmitted, isSubmitting })
  }, [isSubmitted, isSubmitting])
  return (
    <Sheet variant='outlined'
      sx={{
        width: '100%',
        maxWidth: styles.width,
        mx: 'auto',
        my: styles.marginY ?? 4,
        py: styles.paddingY ?? 3,
        px: 2,
        borderRadius: 'sm',
        boxShadow: styles.border ?? 'md',
        border: styles.border
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Sheet sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}>
          {Header}
          <main>
            <Suspense>
              <Box sx={[styles.gridColumns === 1 ? gridFormStyles1 : gridFormStyles2, { width: '100%' }]}>
                {inputsData.map((inputData) => (
                  <DeterminateInput
                    key={inputData.name}
                    data={inputData}
                    register={register(inputData.name,
                      {
                        setValueAs: (value) => {
                          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                          return value === '' ? undefined : value
                        },
                        onChange: (event: SyntheticEvent) => {
                          const value = (event.target as HTMLInputElement).value

                          return value !== '' ? value : undefined
                        }
                      }
                    )}
                    {...{
                      watch,
                      setError,
                      clearErrors
                    }}
                      isSubmitted={isSubmitting}
                    error={errors[inputData.name] != null ? errors[inputData.name]?.message as string : ''}
                  />
                ))}
              </Box>
            </Suspense>
            <Button
              type='submit'
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '1em',
                width: '100%'
              }}
            >
              {isSubmitting
                ? <CircularProgress variant="plain" />
                : buttonSubmitName
              }
            </Button>
          </main>
          {Footer}
        </Sheet>
      </form>
    </Sheet>
  )
}
