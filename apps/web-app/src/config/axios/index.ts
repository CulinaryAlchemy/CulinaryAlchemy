import { setAxiosDefaults } from './axios.defaults'
import { setAxiosInterceptors } from './axios.interceptors'

export const setDefaultAxiosConfig = () => {
  setAxiosDefaults()
  setAxiosInterceptors()
}
