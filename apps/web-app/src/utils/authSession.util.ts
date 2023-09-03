import { type IUser } from '@/models/LOGIC'
import { clearLocalStorage, getFromLocalStorage, setToLocalStorage } from '@/utils'

export const getAuthSession = (accessTokenKey: string, userKey: string) => {
  const accessToken = getFromLocalStorage(accessTokenKey)
  const userData: IUser | null = JSON.parse(getFromLocalStorage(userKey) as string) as IUser

  return { accessToken, userData }
}

export const saveAuthSession = (accessTokenKey: string, userKey: string, sessionData: { accessToken: string, userData: IUser }) => {
  setToLocalStorage(accessTokenKey, sessionData.accessToken)
  setToLocalStorage(userKey, JSON.stringify(sessionData.userData))
}

export const updateUserAuthSession = (userKey: string, userData: IUser) => {
  setToLocalStorage(userKey, JSON.stringify(userData))
}

export const clearSession = () => {
  clearLocalStorage()
}
