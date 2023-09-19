import { loadingContext } from '@/context'
import { useLocalLoading } from '@/hooks'

interface IProps {
  children: React.ReactNode
}

export const LoaderProvider: React.FC<IProps> = ({ children }) => {
  const loaderActions = useLocalLoading()

  return (
        <loadingContext.Provider value={loaderActions}>
          {children}
        </loadingContext.Provider>
  )
}
