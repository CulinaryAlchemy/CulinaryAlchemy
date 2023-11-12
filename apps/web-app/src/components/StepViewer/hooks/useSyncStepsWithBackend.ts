import { useRecipeMethods } from '@/hooks'
import { type TStepArray } from '@/models/LOGIC'
import { useEffect } from 'react'

export const useSyncStepsWithBackend = (recipeId: string | undefined, steps: TStepArray | undefined) => {
  const { updateRecipe } = useRecipeMethods()

  useEffect(() => {
    const lastStep = steps?.at(-1)
    if (steps == null || !recipeId || lastStep?.stepName === '' || lastStep?.stepDescription === '') return

    void updateRecipe(recipeId, { steps }, false)
  }, [recipeId, steps, updateRecipe])
}
