import { DeterminateInput } from '@/components/Form/components'
import { type TFormInputArray } from '@/components/Form/models'
import { type IInputStyles } from '@/models/UI'
import { type FieldErrors, type FieldValues, type UseFormClearErrors, type UseFormRegister, type UseFormSetError, type UseFormWatch } from 'react-hook-form'

interface IInputsStyles {
  textArea?: IInputStyles
  textField?: IInputStyles
}

interface IPropsInputsArray {
  inputsData: TFormInputArray
  register: UseFormRegister<FieldValues>
  errors: FieldErrors<FieldValues>
  watch: UseFormWatch<FieldValues>
  setError: UseFormSetError<FieldValues>
  clearErrors: UseFormClearErrors<FieldValues>
  dirtyFields: Partial<Readonly<Record<string, unknown>>>
  inputStyles?: IInputsStyles
}

export const InputsArray: React.FC<IPropsInputsArray> = ({ inputsData, register, watch, clearErrors, errors, dirtyFields, setError, inputStyles }) => {
  return (
    inputsData.map((inputData, index) => (
          <DeterminateInput
            key={index}
            data={inputData}
            register={register(inputData.name,
              {
                setValueAs: (value) => {
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                  return value !== '' ? value : undefined
                },
                onChange: (event: React.SyntheticEvent) => {
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
    ))
  )
}
