import { config } from '@/config'
import axios from 'axios'

export const setAxiosDefaults = () => {
  axios.defaults.baseURL = config.baseURL
}
