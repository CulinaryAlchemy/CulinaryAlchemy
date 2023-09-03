import { config } from '@/config'
import { type IUser, type IUserRegister, type IUserSignIn } from '@/models/LOGIC'
import { checkUserSession, registerUser, signInUser } from '@/services'
import { clearSession, getAuthSession, saveAuthSession, updateUserAuthSession } from '@/utils'
import { useEffect, useState } from 'react'

export const useLocalAuth = () => {
  const [user, setUser] = useState<IUser>()
  const [isAuth, setIsAuth] = useState(false)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const asyncExecContext = async () => {
      const isValidSession = await checkSession()

      if (!isValidSession) {
        setLoading(false)
        signOut()
        return
      }

      const { accessToken, userData } = getAuthSession(config.localStorage.auth.accessToken, config.localStorage.user)

      if (accessToken == null || userData == null) {
        setLoading(false)
        return
      }

      setUser(userData)
      setLoading(false)
      setIsAuth(true)
    }

    void asyncExecContext()
  }, [])

  const signIn = async (userData: IUserSignIn) => {
    const responseSignIn = await signInUser(userData)

    if (responseSignIn.data.data?.token == null) return

    const { token, user } = responseSignIn.data.data

    if (token == null || user == null) return

    setIsAuth(true)
    setUser(user)

    saveAuthSession(config.localStorage.auth.accessToken, config.localStorage.user, { accessToken: token, userData: user })
  }

  const signUp = (userData: IUserRegister) => {
    void registerUser(userData)
      .then((res) => {
        if (res.status !== 201) return

        const { email, password } = userData

        void signIn({ email, password })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const signOut = () => {
    setIsAuth(false)
    clearSession()
  }

  const updateSessionData = (userData: IUser) => {
    setUser(userData)
    updateUserAuthSession(config.localStorage.user, userData)
  }

  const checkSession = async () => {
    try {
      const response = await checkUserSession()
      return response.data.message === 'VALID_TOKEN'
    } catch (err) {
      return false
    }
  }

  return { user, signIn, signUp, signOut, isAuth, isLoading, updateSessionData }
}
