import { globalConfig } from '@/config'
import {
  type IApiResponse,
  type IAuthApiResponse,
  type IUser,
  type IUserRegister,
  type IUserSignIn,
  type TStorage
} from '@/models/LOGIC'
import {
  checkUserSession,
  loggerInstance,
  registerUser,
  signInUser
} from '@/services'
import {
  clearSession,
  getAuthSession,
  getStorageMethodFromLocalStorage,
  saveAuthSession,
  setStorageMethodToLocalStorage,
  updateUserAuthSession
} from '@/utils'
import { type AxiosResponse } from 'axios'
import { useEffect, useRef, useState } from 'react'

export const useLocalAuth = () => {
  const [user, setUser] = useState<IUser>()

  const [isAuth, setIsAuth] = useState(false)
  const storageMethod = useRef<TStorage>(getStorageMethodFromLocalStorage())
  const [isLoading, setLoading] = useState(
    () =>
      !Object.values(
        getAuthSession(
          globalConfig.localStorage.auth.accessToken,
          globalConfig.localStorage.user,
          storageMethod.current
        )
      ).some((value) => value == null)
  )

  useEffect(() => {
    const asyncExecContext = async () => {
      const { accessToken, userData } = getAuthSession(
        globalConfig.localStorage.auth.accessToken,
        globalConfig.localStorage.user,
        storageMethod.current
      )

      loggerInstance.log('useLocalAuth.ts - 18', {
        storageMethod: storageMethod.current,
        userData,
        accessToken
      })
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

  const defaultSignIn = (
    responseForSignIn: AxiosResponse<IApiResponse<IAuthApiResponse>, unknown>
  ) => {
    if (responseForSignIn.data.data?.token == null) return

    const { token, user } = responseForSignIn.data.data

    if (token == null || user == null) return

    setIsAuth(true)
    setUser(user)

    loggerInstance.log('useLocalAuth.ts - 50', { storageMethod, user, token })
    saveAuthSession(
      globalConfig.localStorage.auth.accessToken,
      globalConfig.localStorage.user,
      { accessToken: token, userData: user },
      storageMethod.current
    )
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
    updateUserAuthSession(
      globalConfig.localStorage.user,
      userData,
      storageMethod.current
    )
  }

  const checkSession = async () => {
    try {
      const response = await checkUserSession()
      return response.data.message === 'VALID_TOKEN'
    } catch (err) {
      return false
    }
  }

  const setStorageMethod = (storage: TStorage) => {
    storageMethod.current = storage
    setStorageMethodToLocalStorage(storage)
  }

  return {
    user,
    signInByApi,
    signUp,
    signOut,
    isAuth,
    isLoading,
    updateSessionData,
    setStorageMethod,
    storageMethod: storageMethod.current
  }
}
