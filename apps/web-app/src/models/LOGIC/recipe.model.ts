export interface IRecipe {
  id?: number
  user_id?: number
  title: string
  description: string
  steps?: string
  authors_notes: string | null
  cooking_time: number
  servings: number
  equipment_needed: string
  ingredients: string
  spices: string | null
  youtube_link: string | null
  end_date: Date | null
  image_1?: string
  image_1_blur?: string
  image_2?: string
  image_2_blur?: string
  image_3?: string
  image_3_blur?: string
  images: string[]
  'images-dropzone': FileList
}

export type TRecipeKey = keyof IRecipe

export type TRecipeArray = IRecipe[]

export type TRecipeIds = number[]
