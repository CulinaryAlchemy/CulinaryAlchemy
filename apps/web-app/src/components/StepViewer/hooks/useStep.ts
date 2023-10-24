import { startTransition, useState } from 'react'

export const useStep = (isStepVoid: boolean) => {
  const [isEditing, setIsEditing] = useState(isStepVoid)

  const toggleIsEditing = (value?: boolean) => {
    startTransition(() => {
      setIsEditing(prevState => value ?? !prevState)
    })
  }
  return { toggleIsEditing, isEditing }
}
