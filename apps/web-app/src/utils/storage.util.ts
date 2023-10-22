import { type TStorage } from '@/models/LOGIC'

export const getFromStorage = (key: string, storage: TStorage = 'localStorage') => {
  return window[storage].getItem(key)
}

export const setToStorage = (key: string, value: string, storage: TStorage = 'localStorage') => {
  window[storage].setItem(key, value)
}

export const clearStorage = () => {
  window.localStorage.clear()
  window.sessionStorage.clear()
}

