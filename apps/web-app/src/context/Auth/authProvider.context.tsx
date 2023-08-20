import { authContext } from '@/context'
import { useLocalAuth } from '@/hooks'

interface IProps {
  children: React.ReactNode
}

export const AuthContextProvider: React.FC<IProps> = ({ children }) => {
  const authActions = useLocalAuth()
  return <authContext.Provider value={{ ...authActions }}>{children}</authContext.Provider>
}
