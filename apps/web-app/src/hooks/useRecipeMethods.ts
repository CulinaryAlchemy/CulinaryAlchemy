import { type IRecipe, type IRecipePartial } from '@/models/LOGIC'
import { createRecipe as createRecipeService, deleteRecipe as deleteRecipeService, updateRecipe as updateRecipeService } from '@/services'
import { useGlobalAuth } from '.'

export const useRecipeMethods = () => {
  const { user } = useGlobalAuth()

  const createRecipe = (recipeData: IRecipe) => {
    recipeData.user_id = user?.id as number
    return createRecipeService(String(user?.id), recipeData)
  }

  const updateRecipe = (recipeId: string, recipeData: IRecipePartial, sendHeadersForFile = true) => {
    recipeData.user_id = user?.id as number
    return updateRecipeService(String(user?.id), recipeId, recipeData, sendHeadersForFile)
  }

  const deleteRecipe = (recipeId: string) => {
    return deleteRecipeService(String(user?.id), recipeId)
  }

  return { createRecipe, updateRecipe, deleteRecipe }
}
