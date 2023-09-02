export class ImageOptimizerManager {
  private readonly canvas
  private readonly context

  constructor () {
    this.canvas = document.createElement('canvas')
    this.context = this.canvas.getContext('2d')
  }

  public optimizeAndResize (imageFileData: File, width: number, height: number): Promise<File> {
    return new Promise((resolve) => {
      const defaultImage = new Image()
      defaultImage.src = URL.createObjectURL(imageFileData)

      const process = async () => {
        this.canvas.width = width // 129.5 // defaultImage.width
        this.canvas.height = height// 129.5 // defaultImage.height

        const { newWidth, newHeight, x, y } = this.resize(width, defaultImage.width, defaultImage.height)

        this.smoothImage()

        this.context?.drawImage(defaultImage, x, y, newWidth, newHeight)

        const imageProcessed = await this.optimizeToWebP()
        const newFile = new File([imageProcessed], imageFileData.name, { type: 'image/webp' })
        resolve(newFile)
        URL.revokeObjectURL(defaultImage.src)
      }

      defaultImage.addEventListener('load', process)
    })
  }

  public resizeForBlur () {}

  private optimizeToWebP (): Promise<Blob> {
    return new Promise((resolve) => {
      this.canvas.toBlob((imageBlob) => {
        if (imageBlob == null) {
          return
        }
        resolve(imageBlob)
      }, 'image/webp', 0.9)
    })
  }

  private smoothImage () {
    if (this.context == null) return
    this.context.imageSmoothingEnabled = true
    this.context.imageSmoothingQuality = 'high'
  }

  private resize (newWidth: number, defaultImageWidth: number, defaultImageHeight: number) {
    const aspectRatio = defaultImageWidth / defaultImageHeight
    const newHeight = newWidth / aspectRatio

    const x = (this.canvas.width - newWidth) / 2
    const y = (this.canvas.height - newHeight) / 2

    return { newWidth, newHeight, x, y }
  }
}
