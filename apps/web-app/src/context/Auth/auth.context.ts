import { createContext, useContext } from 'react'

interface IContext {
  isAuth: boolean
  isLoading: boolean
  signUp: () => void
  signIn: () => void
  logOut: () => void
}

const defaultState = {
  isAuth: false,
  isLoading: true,
  signUp: () => {},
  signIn: () => {},
  logOut: () => {}
}

const authContext = createContext<IContext>(defaultState)

const useAuthContext = () => useContext(authContext)

export { authContext, useAuthContext }
