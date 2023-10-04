import { globalLoadingInstance } from '@/components/GlobalLoading/services'

export const useLocalLoading = () => {
  const toggleLoadingVisibility = () => {
    globalLoadingInstance.sendMessage()
  }

  return { toggleLoadingVisibility }
}
