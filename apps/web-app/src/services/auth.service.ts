import { type IUserRegiser, type IUserSignIn } from '@/models'
import { type IApiResponse } from '@/models/api.model'
import axios from 'axios'

export const registerUser = async (userToRegister: IUserRegiser) => {
  return await axios.post<IApiResponse>('/auth/register', userToRegister)
}


export const signInUser = async (userToSignIn: IUserSignIn) => {
  return await axios.post<IApiResponse>('/auth/sign-in', userToSignIn)
}
