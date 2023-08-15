import { type IUserUpdate } from '@/models/LOGIC'
import { backRoutes } from '@/routing'
import axios from 'axios'

export const updateApiUser = (userId: number, newUser: IUserUpdate) => {
  return axios.put(backRoutes.Dynamic.user.update(userId), newUser)
}
