import { type IRecipe } from '@/models/LOGIC'
import { createRecipe as createRecipeService, updateRecipe as updateRecipeService } from '@/services'
import { useGlobalAuth } from '.'

export const useRecipeMethods = () => {
  const { user } = useGlobalAuth()

  const createRecipe = (recipeData: IRecipe) => {
    recipeData.user_id = user?.id as number
    void createRecipeService(String(user?.id), recipeData)
  }

  const updateRecipe = (recipeId: string, recipeData: IRecipe) => {
    recipeData.user_id = user?.id as number
    return updateRecipeService(String(user?.id), recipeId, recipeData)
  }

  return { createRecipe, updateRecipe }
}
