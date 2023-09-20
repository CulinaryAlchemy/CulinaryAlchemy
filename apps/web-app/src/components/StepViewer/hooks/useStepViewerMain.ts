import { useState, useTransition } from 'react'

export const useStepViewerMain = () => {
  const [isEditModeEnable, setIsEditModeEnable] = useState(false)
  const [, startTransition] = useTransition()

  const toggleEditMode = () => {
    startTransition(() => {
      setIsEditModeEnable((prevValue) => !prevValue)
    })
  }

  return { isEditModeEnable, toggleEditMode }
}
