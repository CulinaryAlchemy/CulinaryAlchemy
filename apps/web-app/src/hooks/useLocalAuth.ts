import { config } from '@/config'
import { type IApiResponse, type IAuthApiResponse, type IUser, type IUserRegister, type IUserSignIn } from '@/models/LOGIC'
import { registerUser, signInUser } from '@/services'
import { clearLocalStorage, getFromLocalStorage, setToLocalStorage } from '@/utils'
import { type AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'

export const useLocalAuth = () => {
  const [user, setUser] = useState<IUser>()
  const [isAuth, setIsAuth] = useState(false)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const { accessToken, userData } = getSession()

    if (accessToken == null || userData == null) {
      setLoading(false)
      return
    }

    setUser(userData)
    setLoading(false)
    setIsAuth(true)
  }, [])

  const defaultSignIn = (responseForSignIn: AxiosResponse<IApiResponse<IAuthApiResponse>, unknown>) => {
    if (responseForSignIn.data.data?.token == null) return

    const { token, user } = responseForSignIn.data.data

    if (token == null || user == null) return

    setIsAuth(true)
    setUser(user)

    saveSession({ accessToken: token, userData: user })
  }

  const signInByApi = async (userData: IUserSignIn) => {
    const responseSignIn = await signInUser(userData)

    defaultSignIn(responseSignIn)
  }

  const signUp = (userData: IUserRegister) => {
    void registerUser(userData)
      .then((res) => {
        if (res.status !== 201) return
        defaultSignIn(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const signOut = () => {
    setIsAuth(false)
    clearLocalStorage()
  }

  const saveSession = (userData: { accessToken: string, userData: IUser }) => {
    setToLocalStorage(config.localStorage.auth.accessToken, userData.accessToken)
    saveUserSession(userData.userData)
  }

  const updateSessionData = (userData: IUser) => {
    setUser(userData)
    saveUserSession(userData)
  }

  const saveUserSession = (userData: IUser) => {
    setToLocalStorage(config.localStorage.user, JSON.stringify(userData))
  }

  const getSession = () => {
    const accessToken = getFromLocalStorage(config.localStorage.auth.accessToken)
    const userData: IUser | null = JSON.parse(getFromLocalStorage(config.localStorage.user) as string) as IUser

    return { accessToken, userData }
  }

  return { user, signInByApi, signUp, signOut, isAuth, isLoading, updateSessionData }
}
