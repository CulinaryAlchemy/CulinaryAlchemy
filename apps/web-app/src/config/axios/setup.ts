import { setAxiosDefaults, setAxiosInterceptors } from '@/config/'

export const setDefaultAxiosConfig = () => {
  setAxiosDefaults()
  setAxiosInterceptors()
}

