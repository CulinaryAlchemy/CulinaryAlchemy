import { type IApiResponse, type IAuthApiResponse, type IUserRegiser, type IUserSignIn } from '@/models'
import { backRoutes } from '@/routing'
import axios from 'axios'

export const registerUser = async (userToRegister: IUserRegiser) => {
  return await axios.post<IApiResponse<IAuthApiResponse>>(backRoutes.Static.auth.signup, userToRegister)
}


export const signInUser = async (userToSignIn: IUserSignIn) => {
  return await axios.post<IApiResponse<IAuthApiResponse>>(backRoutes.Static.auth.signin, userToSignIn)
}
