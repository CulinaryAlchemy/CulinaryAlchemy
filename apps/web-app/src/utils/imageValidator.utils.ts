import { globalConfig } from '@/config'

interface IIsValidWidthAndHeight {
  file: File
  minHeight: number
  minWidth: number
}

export class ImageValidator {
  public validateSize (file: File) {
    return file.size < globalConfig.image.maxSizeBytes
  }

  public validateWidthAndHeight ({ file, minHeight, minWidth }: IIsValidWidthAndHeight) {
    return new Promise((resolve) => {
      const fileURL = URL.createObjectURL(file)
      const image = new Image()
      image.src = fileURL
      image.addEventListener('load', () => {
        resolve(!(image.width < minWidth || image.height < minHeight))
        URL.revokeObjectURL(fileURL)
      })
    })
  }
}
