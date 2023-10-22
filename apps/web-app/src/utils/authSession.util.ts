import { globalConfig } from '@/config'
import { type IUser, type TStorage } from '@/models/LOGIC'
import { loggerInstance } from '@/services'
import { clearStorage, getFromStorage, setToStorage } from '@/utils'

export const getAuthSession = (accessTokenKey: string, userKey: string, storage: TStorage = 'localStorage') => {
  const accessToken = getFromStorage(accessTokenKey, storage)
  const userData: IUser | null = JSON.parse(getFromStorage(userKey, storage) as string) as IUser

  loggerInstance.log('authSession.util.ts', { accessToken, userData })
  return { accessToken, userData }
}

export const saveAuthSession = (accessTokenKey: string, userKey: string, sessionData: { accessToken: string, userData: IUser }, storage: TStorage = 'localStorage') => {
  setToStorage(accessTokenKey, sessionData.accessToken, storage)
  setToStorage(userKey, JSON.stringify(sessionData.userData), storage)
}

export const updateUserAuthSession = (userKey: string, userData: IUser, storage: TStorage = 'localStorage') => {
  setToStorage(userKey, JSON.stringify(userData), storage)
}

export const clearSession = () => {
  clearStorage()
}

export const getStorageMethodFromLocalStorage = () => {
  const dataStorage = getFromStorage(globalConfig.localStorage.auth.storageMethod)

  let sessionMethod: TStorage

  if (dataStorage == null) {
    sessionMethod = 'localStorage'
  } else {
    sessionMethod = dataStorage as TStorage
  }

  loggerInstance.log('authSession.util.ts', sessionMethod)

  return sessionMethod
}

export const setStorageMethodToLocalStorage = (storageMethod: TStorage) => {
  setToStorage(globalConfig.localStorage.auth.storageMethod, storageMethod)
}
