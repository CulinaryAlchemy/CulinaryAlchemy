import { CBackRoutes } from '@/routing'
import axios from 'axios'

export const getServerStatus = async () => {
  return await axios.get(CBackRoutes.Static.health)
}
