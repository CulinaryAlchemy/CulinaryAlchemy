export interface IRecipe {
  id: number
  user_id: number
  title: string
  description: string
  steps: string
  authors_notes: string | null
  cooking_time: number
  servings: number
  equipment_needed: string
  ingredients: string
  spices: string | null
  youtube_link: string | null
  end_date: Date | null
}

export type TRecipeIds = number[]
