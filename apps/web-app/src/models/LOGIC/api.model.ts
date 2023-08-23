import { type IRole, type IUser } from '@/models/LOGIC'

export interface IApiResponse<T> {
  data: null | T
  error: IError | null
  statusCode: number
  success: boolean
}

interface IError {
  statusCode: number
  message: string
}

export interface IAuthApiResponse {
  token: string
  user: IUser
}

export type IUserApiResponse = IUser

export type IRoleApiResponse = IRole
