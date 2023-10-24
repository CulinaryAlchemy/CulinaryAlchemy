import { DeterminateInput } from '@/components/Form/components'
import { type TFormInputArray } from '@/components/Form/models'
import { type IInputStyles } from '@/models/UI'
import { useFormContext } from 'react-hook-form'

interface IInputsStyles {
  textArea?: IInputStyles
  textField?: IInputStyles
}

interface IPropsInputsArray {
  areInputsReadOnly?: boolean
  inputsData: TFormInputArray
  inputStyles?: IInputsStyles
}

export const InputsArray: React.FC<IPropsInputsArray> = ({ areInputsReadOnly = false, inputsData, inputStyles }) => {
  const { register, formState: { errors } } = useFormContext()
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
              areInputsReadOnly,
              inputStyles
            }}
            error={errors[inputData.name] != null ? errors[inputData.name]?.message as string : ''}
          />
    ))
  )
}
