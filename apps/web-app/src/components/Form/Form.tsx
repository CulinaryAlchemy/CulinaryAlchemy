import { type TFormInputArray } from '@/components/Form/models'
import { InputsArray } from './components'

import { zodResolver } from '@hookform/resolvers/zod'
import { Suspense, useState } from 'react'
import { useForm, type FieldValues, type SubmitHandler } from 'react-hook-form'
import { type ZodObject, type ZodRawShape } from 'zod'

import { type IInputStyles } from '@/models/UI'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button/'
import Divider from '@mui/joy/Divider'
import Sheet from '@mui/joy/Sheet/'
import Stack from '@mui/joy/Stack'
import { toast } from 'sonner'
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
  inputsGap?: string
  backgroundColor?: string
  gridTemplateAreasMain?: string
  gridTemplateAreasOptionals?: string
}

interface IForm {
  schema: ZodObject<ZodRawShape>
  inputsDataMain: TFormInputArray
  inputsDataOptionals?: TFormInputArray
  inputsDataFooter?: TFormInputArray
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

export const Form: React.FC<IForm> = ({ defaultValues, schema, inputsDataMain, onSubmit, Header, Footer, buttonSubmitName = 'submit', styles, inputStyles, showResetButton = true, buttonSubmitSide, inputsDataFooter, inputsDataOptionals }) => {
  const {
    register,
    handleSubmit: defaultHandleSubmit,
    watch,
    setError,
    clearErrors,
    reset,
    formState: {
      errors,
      dirtyFields,
      isDirty
    }
  } = useForm<FieldValues>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: adaptDefaultValues(defaultValues as object),
    resolver: zodResolver(schema, { async: true }, { mode: 'async' })
  })

  console.log(errors)

  const [showOptionalInputs, setShowOptionalInputs] = useState(false)

  const handleOnClickToggleOptionalInputsDisplay = () => {
    setShowOptionalInputs(prevState => !prevState)
  }
  const handleOnClickForReset = () => {
    reset()
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOnSubmit = defaultHandleSubmit((data: FieldValues, event: React.BaseSyntheticEvent<object, any, any> | undefined) => {
    if (!isDirty) {
      toast('The form is not dirty')
      return
    }

    onSubmit(data, event)
  })

  return (
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
        mx: 'auto',
        backgroundColor: styles.backgroundColor
      }}
    >
      <form onSubmit={handleOnSubmit} noValidate>
        <Sheet
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            backgroundColor: styles.backgroundColor
          }}>
          {Header}
          <main>
            <Suspense>
              <Box
                component='section'
                sx={
                  [
                    {
                      display: styles.display,
                      width: '100%',
                      gridTemplateAreas: styles.gridTemplateAreasMain,
                      flexWrap: styles.flexWrap,
                      justifyContent: styles.justifyContent,
                      gap: styles.inputsGap
                    },
                    styles.gridColumns === 1 && gridFormStyles1,
                    styles.gridColumns === 2 && gridFormStyles2
                  ]
                }
              >
                <InputsArray
                  {...{
                    inputsData: inputsDataMain,
                    clearErrors,
                    dirtyFields,
                    errors,
                    register,
                    setError,
                    watch,
                    inputStyles
                  }}
                />
              </Box>
              {
                inputsDataOptionals?.[0] != null &&
                <Divider
                  sx={{
                    marginBlock: '0.5em'
                  }}
                >
                  <Button
                    variant='outlined'
                    color='neutral'
                    size='sm'
                    onClick={handleOnClickToggleOptionalInputsDisplay}
                  >
                    {showOptionalInputs ? 'Hide' : 'Show'} optional fields
                  </Button>
                </Divider>
              }
              {
                (showOptionalInputs && inputsDataOptionals?.[0] != null) &&

                <Box
                  component='section'
                  sx={
                    [
                      {
                        display: styles.display,
                        width: '100%',
                        gridTemplateAreas: styles.gridTemplateAreasOptionals,
                        flexWrap: styles.flexWrap,
                        justifyContent: styles.justifyContent,
                        gap: styles.inputsGap
                      },
                      styles.gridColumns === 1 && gridFormStyles1,
                      styles.gridColumns === 2 && gridFormStyles2
                    ]
                  }
                >
                  <InputsArray
                    {...{
                      inputsData: inputsDataOptionals,
                      clearErrors,
                      dirtyFields,
                      errors,
                      register,
                      setError,
                      watch,
                      inputStyles
                    }}
                  />
                </Box>
              }
              <Stack
                direction='row'
                spacing={1}
                marginTop={1}
                justifyContent={buttonSubmitSide}
              >
                {
                  inputsDataFooter?.[0] != null &&
                  <InputsArray
                    {...{
                      inputsData: inputsDataFooter,
                      clearErrors,
                      dirtyFields,
                      errors,
                      register,
                      setError,
                      watch,
                      inputStyles
                    }}
                  />
                }
                <Button
                  type='submit'
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '1em',
                    minHeight: '2.6em',
                    borderRadius: '0.4em',
                    flexGrow: buttonSubmitSide === 'default' ? 1 : 0
                  }}
                  disabled={Object.values(errors).length > 0 || (!isDirty && Object.values(errors).length > 0)}
                >
                  {buttonSubmitName}
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
            </Suspense>
          </main>
          {Footer}
        </Sheet>
      </form >
    </Sheet >
  )
}

export default Form
