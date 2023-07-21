import { createContext, useContext } from 'react'

interface IContext {
  isAuth: boolean
  isLoading: boolean
  logIn: () => void
  logOut: () => void
}
const authContext = createContext<IContext>({})

const useAuthContext = () => useContext(authContext)

export { authContext, useAuthContext }
