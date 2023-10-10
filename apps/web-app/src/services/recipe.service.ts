import { type IApiResponse, type IRecipe } from '@/models/LOGIC'
import { CBackRoutes } from '@/routing'
import axios from 'axios'

export const getRecipeById = async (recipeId: string) => {
  return await axios.get<IApiResponse<IRecipe>>(CBackRoutes.Dynamic.recipe.getById(recipeId))
}

export const createRecipe = async (userId: string, recipeData: IRecipe) => {
  return await axios.post<IApiResponse<unknown>>(CBackRoutes.Dynamic.recipe.create(userId), recipeData, { headers: { 'Content-Type': 'multipart/form-data' }, signal: AbortSignal.timeout(30000) })
}

export const deleteRecipe = async (userId: string, recipeId: string) => {
  return await axios.post<IApiResponse<unknown>>(CBackRoutes.Dynamic.recipe.deleteById(userId, recipeId))
}
