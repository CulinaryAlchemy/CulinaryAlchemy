import { useDebounce } from '@/components/Form/hooks'
import { checkApiUserKey } from '@/services'
import { useEffect, useState } from 'react'
import { type FieldValues, type UseFormClearErrors, type UseFormSetError } from 'react-hook-form'

interface IParams {
  inputName: string
  watchValue: string
  setError: UseFormSetError<FieldValues>
  clearErrors: UseFormClearErrors<FieldValues>
  isSubmitted: boolean
}
export const useAsyncValidations = ({ inputName, watchValue, setError, clearErrors, isSubmitted }: IParams) => {
  const { newValue } = useDebounce(watchValue, 500)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (newValue == null) return
    setLoading(true)
    console.log('making request', { newValue })
    // For best clean code mode this to zod validators and avoid the complexity
    if (inputName === 'username' || inputName === 'email') {
      checkApiUserKey(inputName, newValue as string)
        .then(() => {
          clearErrors(['username', 'email'])
        })
        .catch(() => {
          setError(inputName, { message: inputName + ' isn\'t Available' }, { shouldFocus: true })
          setError('globalStoop', { message: '' })
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [newValue, inputName, setError, clearErrors, isSubmitted])

  return { loading }
}
