import { useRecipeMethods } from '@/hooks'
import { type TStepArray } from '@/models/LOGIC'
import { useEffect } from 'react'

export const useSyncStepsWithBackend = (recipeId: string | undefined, steps: TStepArray | undefined) => {
  const { updateRecipe } = useRecipeMethods()

  useEffect(() => {
    if (steps == null || !recipeId) return

    void updateRecipe(recipeId, { steps })
  }, [recipeId, steps, updateRecipe])
}
