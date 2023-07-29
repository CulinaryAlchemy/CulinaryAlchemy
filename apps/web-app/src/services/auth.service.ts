import { type IApiResponse, type IAuthApiResponse, type IUserRegiser, type IUserSignIn } from '@/models'
import axios from 'axios'

export const registerUser = async (userToRegister: IUserRegiser) => {
  return await axios.post<IApiResponse<IAuthApiResponse>>('/auth/sign-up', userToRegister)
}


export const signInUser = async (userToSignIn: IUserSignIn) => {
  return await axios.post<IApiResponse<IAuthApiResponse>>('/auth/sign-in', userToSignIn)
}
