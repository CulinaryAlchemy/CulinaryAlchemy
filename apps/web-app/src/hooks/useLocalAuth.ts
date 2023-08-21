import { config } from '@/config'
import { type IUser, type IUserRegister, type IUserSignIn } from '@/models/LOGIC'
import { registerUser, signInUser } from '@/services'
import { clearLocalStorage, getFromLocalStorage, setToLocalStorage } from '@/utils'
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


  const saveSession = (userData: { accesToken: string, userData: object }) => {
    setToLocalStorage(config.localStorage.auth.accessToken, userData.accesToken)
    setToLocalStorage(config.localStorage.user, JSON.stringify(userData.userData))
  }

  const getSession = () => {
    const accessToken = getFromLocalStorage(config.localStorage.auth.accessToken)
    const userData: IUser | null = JSON.parse(getFromLocalStorage(config.localStorage.user) as string) as IUser

    return { accessToken, userData }
  }

  const signIn = async (userData: IUserSignIn) => {
    const responseSignIn = await signInUser(userData)

    if (responseSignIn.data.data?.token == null) return

    const { token, user } = responseSignIn.data.data

    if (token == null || user == null) return

    setIsAuth(true)
    setUser(user)

    saveSession({ accesToken: token, userData: user })
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
    clearLocalStorage()
  }
  return { user, signIn, signUp, signOut, isAuth, isLoading }
}
