import {
  type IUser,
  type IUserRegister,
  type IUserSignIn,
  type TStorage
} from '@/models/LOGIC'
import { createContext, useContext } from 'react'

interface IContext {
  user: IUser | undefined
  signInByApi: (userData: IUserSignIn) => Promise<unknown>
  signUp: (userData: IUserRegister) => Promise<void>
  updateSessionData: (userData: IUser) => void
  signOut: () => void
  isAuth: boolean
  isLoading: boolean
  setStorageMethod: (storage: TStorage) => void
  storageMethod: TStorage
}
const defaultState: IContext = {
  user: undefined,
  isAuth: false,
  isLoading: true,
  signInByApi: async () => {},
  signUp: async () => {},
  signOut: () => {},
  updateSessionData: () => {},
  setStorageMethod: () => {},
  storageMethod: 'localStorage'
}

const authContext = createContext<IContext>(defaultState)

const useAuthContext = () => useContext(authContext)

export { authContext, useAuthContext }
