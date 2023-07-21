import { useEffect, useState } from 'react'

export const useAuth = () => {
  const [isAuth, setAuth] = useState(true)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  const logIn = () => {
    setAuth(true)
  }
  const logOut = () => {
    setAuth(false)
  }
  return { logIn, logOut, isAuth, isLoading }
}
