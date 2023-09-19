import { useState } from 'react'

export const useLocalLoading = () => {
  const [isVisibleLoading, setIsVisibleLoader] = useState(false)

  const toggleLoadingVisibility = () => {
    setIsVisibleLoader((loadingValue) => !loadingValue)
  }

  return { isVisibleLoading, toggleLoadingVisibility }
}
