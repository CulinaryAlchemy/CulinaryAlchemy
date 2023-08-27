import { useEffect, useState } from 'react'

export const useDebounce = (value: unknown, debounceTime: number) => {
  const [newValue, setNewValue] = useState(value)

  useEffect(() => {
    if (value == null) return

    const timeOut = setTimeout(() => {
      setNewValue(value)
    }, debounceTime)

    return () => { clearTimeout(timeOut) }
  }, [value, debounceTime])

  return { newValue }
}
