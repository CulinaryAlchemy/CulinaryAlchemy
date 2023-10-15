import { globalConfig } from '@/config'
import { ImageOptimizerManager, ImageValidator, toastUtils } from '@/utils'

export const optimizeImage = async (newFile: File, height: number, width: number, onError: () => void) => {
  const file = newFile

  const imageValidatorInstance = new ImageValidator()

  const isValidWidthAndHeight = await imageValidatorInstance.validateWidthAndHeight(
    {
      file,
      minHeight: height,
      minWidth: width
    }
  )

  if (!isValidWidthAndHeight) {
    toastUtils.error(`The image dimensions are too small. They should be at least ${width}px wide by ${height}px high.`)
    onError()
    return
  }

  const imageOptimizerInstance = new ImageOptimizerManager()
  const imageProcessedFile = await imageOptimizerInstance.optimizeAndResize(file, width, height)

  const isValidImageSize = imageValidatorInstance.validateSize(imageProcessedFile)

  if (!isValidImageSize) {
    toastUtils.error(`The image is too large. The maximum allowed image size is ${globalConfig.image.maxSizeBytes / 1024}KB.`)
    onError()
    return
  }

  const imageBlur = await imageOptimizerInstance.optimizeAndResize(imageProcessedFile, 20, 20)

  return { imageProcessedFile, imageBlur }
}
