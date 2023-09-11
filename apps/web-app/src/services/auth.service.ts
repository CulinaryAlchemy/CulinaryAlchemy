import { type IApiResponse, type IAuthApiResponse, type IUserRegister, type IUserSignIn } from '@/models/LOGIC'
import { CBackRoutes } from '@/routing'
import axios from 'axios'

export const registerUser = async (userToRegister: IUserRegister) => {
  return await axios.post<IApiResponse<IAuthApiResponse>>(CBackRoutes.Static.auth.signup, userToRegister)
}


export const signInUser = async (userToSignIn: IUserSignIn) => {
  return await axios.post<IApiResponse<IAuthApiResponse>>(CBackRoutes.Static.auth.signin, userToSignIn)
}

export const checkUserSession = async () => {
  return await axios.get<IApiResponse<IAuthApiResponse>>(CBackRoutes.Static.auth.check.accessToken)
}
