import { type IRole, type IUser } from '@/models/LOGIC'

export interface IApiResponse<T> {
  data: null | T
  error: IApiError | null
  statusCode: number
  success: boolean
  message: string
}

export interface IApiError {
  statusCode: number
  message: string
  invalidAreas?: null | string[]
}

export interface IAuthApiResponse {
  token: string
  user: IUser
}

export type IUserApiResponse = IUser & { recipes: Array<{ id: number }> }

export type IRoleApiResponse = IRole
