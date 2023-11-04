import { type IImageFileOptimizedFromBackArray } from '@/models/UI'

export interface IRecipe {
  id?: number
  user_id?: number
  title: string
  description: string
  steps?: TStepArray
  authors_notes: string | null
  cooking_time: number
  servings: number
  equipment_needed: string
  ingredients: string
  spices: string | null
  youtube_link: string | null
  end_date: Date | null
  image_1?: File
  image_1_blur?: File
  image_2?: File
  image_2_blur?: File
  image_3?: File
  image_3_blur?: File
  images: IImageFileOptimizedFromBackArray
  'images-dropzone': FileList | null
}

export interface IStep {
  stepName: string
  stepDescription: string
}

export type TStepArray = IStep[]

export type TRecipeKey = keyof IRecipe

export type TRecipeArray = IRecipe[]

export type TRecipeIds = number[]
