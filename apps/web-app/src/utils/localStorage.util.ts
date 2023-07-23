export const getFromLocalStorage = (key: string) => {
  return window.localStorage.getItem(key)
}

export const setToLocalStorage = (key: string, value: string) => {
  window.localStorage.setItem(key, value)
}

export const clearLocalStorage = () => {
  window.localStorage.clear()
}

