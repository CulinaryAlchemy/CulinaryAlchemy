import { type IUserUpdate } from '@/models/LOGIC'
import { CBackRoutes } from '@/routing'
import axios from 'axios'

export const updateApiUser = (userId: number, newUser: IUserUpdate) => {
  return axios.put(CBackRoutes.Dynamic.user.update(userId), newUser)
}
