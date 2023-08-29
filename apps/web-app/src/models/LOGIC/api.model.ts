import { type IRole, type IUser } from '@/models/LOGIC'

export interface IApiResponse<T> {
  data: null | T
  error: IApiError | null
  statusCode: number
  success: boolean
}

interface IApiError {
  statusCode: number
  message: string
  invalidAreas?: null | string[]
}

export interface IAuthApiResponse {
  token: string
  user: IUser
}

export type IUserApiResponse = IUser

export type IRoleApiResponse = IRole
