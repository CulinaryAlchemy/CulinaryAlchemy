import { type IUser } from '@/models/'

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
