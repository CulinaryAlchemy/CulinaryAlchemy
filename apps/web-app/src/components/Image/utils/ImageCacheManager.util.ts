// This is temporal while we create own lazy load images library
export class ImageCacheManager {
  private readonly imageNames: string[]

  constructor () {
    this.imageNames = []
  }

  addImage (imageUrl: string) {
    if (!this.imageNames.includes(imageUrl)) {
      this.imageNames.push(imageUrl)
    }
  }

  shouldLoadWithCache (imageUrl: string) {
    return this.imageNames.includes(imageUrl)
  }
}
