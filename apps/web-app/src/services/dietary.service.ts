import { type IApiResponse, type IDietary } from '@/models/LOGIC'
import { CBackRoutes } from '@/routing'
import axios from 'axios'

export const getDietaryById = async (dietaryId: number) => {
  return await axios.get<IApiResponse<IDietary[]>>(
    CBackRoutes.Dynamic.dietary.getById(dietaryId)
  )
}

export const getAllDietaries = async () => {
  return await axios.get<IApiResponse<IDietary>>(
    CBackRoutes.Static.dietary.getAll
  )
}

export const addDietaryToUser = async (userId: number, dietaryId: number) => {
  return await axios.post<IApiResponse<unknown>>(
    CBackRoutes.Dynamic.user.addDietary(userId, dietaryId)
  )
}

export const removeDietaryToUser = async (
  userId: number,
  dietaryId: number
) => {
  return await axios.post<IApiResponse<unknown>>(
    CBackRoutes.Dynamic.user.removeDietary(userId, dietaryId)
  )
}
