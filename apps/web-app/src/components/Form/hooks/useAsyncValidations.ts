import { useDebounce } from '@/components/Form/hooks'
import { checkApiUserKey } from '@/services'
import { useEffect, useState } from 'react'
import { type FieldValues, type UseFormClearErrors, type UseFormSetError } from 'react-hook-form'

interface IParams {
  inputName: string
  watchValue: string
  setError: UseFormSetError<FieldValues>
  clearErrors: UseFormClearErrors<FieldValues>
  isDirty: boolean
}
export const useAsyncValidations = ({ inputName, watchValue, setError, clearErrors, isDirty }: IParams) => {
  const { newValue } = useDebounce(watchValue, 500)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (newValue != null || isDirty) {
      setError('root.writingError', { message: 'writing error' })
    }

    if (!isDirty) {
      clearErrors(['root.writingError', 'root.serverError'])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchValue, isDirty])

  useEffect(() => {
    if (newValue == null || isDirty == null) return

    setLoading(true)
    // For best clean code mode this to zod validators and avoid the complexity
    if (inputName === 'username' || inputName === 'email') {
      checkApiUserKey(inputName, newValue as string)
        .then(() => {
          clearErrors(['root.serverError', inputName])
        })
        .catch(() => {
          setError(inputName, { message: inputName + ' isn\'t Available' })
          setError('root.serverError', { message: 'globalServerError' })
        })
        .finally(() => {
          clearErrors(['root.writingError'])
          setLoading(false)
        })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newValue, setError, clearErrors])

  return { loading }
}
