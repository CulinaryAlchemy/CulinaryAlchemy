import { type IRecipe } from '@/models/LOGIC'
import { createRecipe as createRecipeService } from '@/services'
import { useGlobalAuth } from '.'

export const useRecipeMethods = () => {
  const { user } = useGlobalAuth()

  const createRecipe = (recipeData: IRecipe) => {
    recipeData.user_id = user?.id as number
    void createRecipeService(String(user?.id), recipeData)
  }

  return { createRecipe }
}
