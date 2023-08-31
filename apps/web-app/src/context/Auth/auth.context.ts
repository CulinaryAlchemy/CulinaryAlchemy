import { type IUser, type IUserRegister, type IUserSignIn } from '@/models/LOGIC'
import { createContext, useContext } from 'react'

interface IContext {
  user: IUser | undefined
  signInByApi: (userData: IUserSignIn) => Promise<void>
  signUp: (userData: IUserRegister) => void
  updateSessionData: (userData: IUser) => void
  signOut: () => void
  isAuth: boolean
  isLoading: boolean
}
const defaultState: IContext = {
  user: undefined,
  isAuth: false,
  isLoading: true,
  signInByApi: async () => { },
  signUp: async () => { },
  signOut: () => {},
  updateSessionData: () => {}
}

const authContext = createContext<IContext>(defaultState)

const useAuthContext = () => useContext(authContext)

export { authContext, useAuthContext }
