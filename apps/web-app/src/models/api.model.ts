import { type IUser } from '@/models'

export interface IApiResponse {
  data: null | IData
  error: IError | null
  statusCode: number
  success: boolean
}

interface IError {
  statusCode: number
  message: string
}

interface IData {
  token: string
  user: IUser
}
