import { authContext } from '@/context'
import { useAuth } from '@/hooks'

interface IProps {
  children: React.ReactNode
}

export const AuthContextProvider: React.FC<IProps> = ({ children }) => {
  const authActions = useAuth()
  return <authContext.Provider value={{ ...authActions }}>{children}</authContext.Provider>
}
