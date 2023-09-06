import { globalConfig } from '@/config'
import axios from 'axios'

export const setAxiosDefaults = () => {
  axios.defaults.baseURL = globalConfig.baseURL.backend
}
