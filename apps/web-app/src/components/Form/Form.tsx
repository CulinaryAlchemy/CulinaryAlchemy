import { type TFormInputArray } from '@/components/Form/models'
import { DeterminateInput } from './components'

import { zodResolver } from '@hookform/resolvers/zod'
import { Suspense, type SyntheticEvent } from 'react'
import { useForm, type FieldValues, type SubmitHandler } from 'react-hook-form'
import { type ZodObject, type ZodRawShape } from 'zod'

import { type IInputStyles } from '@/models/UI'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button/'
import CircularProgress from '@mui/joy/CircularProgress'
import Sheet from '@mui/joy/Sheet/'
import Stack from '@mui/joy/Stack'
import { adaptDefaultValues } from './adapters'

interface IInputsStyles {
  textArea?: IInputStyles
  textField?: IInputStyles
}


interface IStyles {
  gridColumns?: 1 | 2
  flexWrap?: 'wrap' | 'nowrap'
  display: 'flex' | 'grid'
  width: string
  border?: 'none'
  paddingY?: string
  paddingX?: string
  marginY?: string
  justifyContent?: 'center' | 'start'
  gap?: number
}

interface IForm {
  schema: ZodObject<ZodRawShape>
  inputsData: TFormInputArray
  onSubmit: SubmitHandler<FieldValues>
  Header?: React.ReactNode
  Footer?: React.ReactNode
  defaultValues?: object
  buttonSubmitName: string
  buttonSubmitSide?: 'default' | 'start' | 'end'
  styles: IStyles
  inputStyles?: IInputsStyles
  showResetButton?: boolean
}

const gridFormStyles1 = { display: 'grid', gridTemplateColumns: '1fr', gap: '0.1em' }
const gridFormStyles2 = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1em' }

export const Form: React.FC<IForm> = ({ defaultValues, schema, inputsData, onSubmit, Header, Footer, buttonSubmitName = 'submit', styles, inputStyles, showResetButton = true, buttonSubmitSide }) => {
  const {
    register,
    handleSubmit: defaultHandleSubmit,
    watch,
    setError,
    clearErrors,
    reset,
    formState: {
      errors,
      isSubmitting,
      dirtyFields,
      isDirty
    }
  } = useForm<FieldValues>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: adaptDefaultValues(defaultValues as object),
    resolver: zodResolver(schema, { async: true }, { mode: 'async' })
  })

  const handleOnClickForReset = () => {
    reset()
  }

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: styles.width,
        mx: 'auto'
      }}
    >
      <Sheet
        variant='outlined'
        sx={{
          width: '100%',
          maxWidth: styles.width,
          my: styles.marginY ?? 4,
          py: styles.paddingY ?? 3,
          px: styles.paddingX ?? 2,
          borderRadius: 'sm',
          boxShadow: styles.border ?? 'md',
          border: styles.border,
          zIndex: 100
        }}
      >
        <form onSubmit={defaultHandleSubmit(onSubmit)} noValidate>
          <Sheet sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}>
            {Header}
            <main>
              <Suspense>
                <Box sx={
                  [
                    {
                      display: styles.display,
                      width: '100%',
                      flexWrap: styles.flexWrap,
                      justifyContent: styles.justifyContent
                    },
                    styles.gridColumns === 1 && gridFormStyles1,
                    styles.gridColumns === 2 && gridFormStyles2
                  ]
                }
                >
                  {inputsData.map((inputData, index) => (
                    <DeterminateInput
                      key={index}
                      data={inputData}
                      register={register(inputData.name,
                        {
                          setValueAs: (value) => {
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                            return value !== '' ? value : undefined
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
                        clearErrors,
                        inputStyles
                      }}
                      isDirty={dirtyFields[inputData.name] as boolean}
                      error={errors[inputData.name] != null ? errors[inputData.name]?.message as string : ''}
                    />
                  ))}
                </Box>
              </Suspense>
              <Stack
                direction='row'
                spacing={1}
                marginTop={1}
                justifyContent={buttonSubmitSide}
              >
                <Button
                  type='submit'
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '1em',
                    flexGrow: buttonSubmitSide === 'default' ? 1 : 0
                  }}
                  disabled={Object.values(errors).length > 0 || !isDirty}
                >
                  {isSubmitting
                    ? <CircularProgress variant="plain" />
                    : buttonSubmitName
                  }
                </Button>
                {showResetButton &&
                  <Button
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: '1em'
                    }}
                    size='sm'
                    variant='outlined'
                    onClick={handleOnClickForReset}
                  >
                    Reset
                  </Button>
                }
              </Stack>
            </main>
            {Footer}
          </Sheet>
        </form >
      </Sheet >
    </Box>
  )
}

export default Form
