import { type IApiResponse, type IUser, type IUserUpdate } from '@/models/LOGIC'
import { CBackRoutes } from '@/routing'
import axios from 'axios'

export const updateApiUser = (userId: number, newUser: IUserUpdate) => {
  return axios.put<IApiResponse<IUser>>(CBackRoutes.Dynamic.user.update(userId), newUser, { headers: { 'Content-Type': 'multipart/form-data' } })
}

export const deleteApiUser = (userId: number) => {
  return axios.delete<IApiResponse<unknown>>(CBackRoutes.Dynamic.user.update(userId))
}

export const checkApiUserKey = (key: 'email' | 'username', value: string) => {
  return axios.post<IApiResponse<unknown>>(CBackRoutes.Static.user.check[key], { [key]: value })
}
