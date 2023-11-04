export interface IImageFileOptimized {
  src: File
  srcBlurPlaceholder: File
}

export interface IImageFileOptimizedFromBack {
  default_url: string
  blur_url: string
}

export type TImageFileOptimizedArray = IImageFileOptimized[]
export type IImageFileOptimizedFromBackArray = IImageFileOptimizedFromBack[]

