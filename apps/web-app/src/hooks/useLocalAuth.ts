import { globalConfig } from '@/config'
import { type IApiResponse, type IAuthApiResponse, type IUser, type IUserRegister, type IUserSignIn } from '@/models/LOGIC'
import { checkUserSession, loggerInstance, registerUser, signInUser } from '@/services'
import { clearSession, getAuthSession, saveAuthSession, updateUserAuthSession } from '@/utils'
import { type AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'

export const useLocalAuth = () => {
  const [user, setUser] = useState<IUser>()
  const [isAuth, setIsAuth] = useState(false)
  const [isLoading, setLoading] = useState(globalConfig.localStorage.isThereUser)

  useEffect(() => {
    const asyncExecContext = async () => {
      const { accessToken, userData } = getAuthSession(globalConfig.localStorage.auth.accessToken, globalConfig.localStorage.user)

      if (accessToken == null || userData == null) {
        setLoading(false)
        return
      }

      const isValidSession = await checkSession()

      if (!isValidSession) {
        setLoading(false)
        signOut()
        return
      }

      setUser(userData)
      setLoading(false)
      setIsAuth(true)
    }

    void asyncExecContext()
  }, [])

  const defaultSignIn = (responseForSignIn: AxiosResponse<IApiResponse<IAuthApiResponse>, unknown>) => {
    if (responseForSignIn.data.data?.token == null) return

    const { token, user } = responseForSignIn.data.data

    if (token == null || user == null) return

    setIsAuth(true)
    setUser(user)

    saveAuthSession(globalConfig.localStorage.auth.accessToken, globalConfig.localStorage.user, { accessToken: token, userData: user })
  }

  const signInByApi = async (userData: IUserSignIn) => {
    const responseSignIn = await signInUser(userData)

    defaultSignIn(responseSignIn)
  }

  const signUp = async (userData: IUserRegister) => {
    await registerUser(userData)
      .then((res) => {
        if (res.status !== 201) return
        defaultSignIn(res)
      })
      .catch((err) => {
        loggerInstance.log('useLocalAuth.ts', err)
      })
  }

  const signOut = () => {
    setIsAuth(false)
    clearSession()
  }

  const updateSessionData = (userData: IUser) => {
    setUser(userData)
    updateUserAuthSession(globalConfig.localStorage.user, userData)
  }

  const checkSession = async () => {
    try {
      const response = await checkUserSession()
      return response.data.message === 'VALID_TOKEN'
    } catch (err) {
      return false
    }
  }

  return { user, signInByApi, signUp, signOut, isAuth, isLoading, updateSessionData }
}
