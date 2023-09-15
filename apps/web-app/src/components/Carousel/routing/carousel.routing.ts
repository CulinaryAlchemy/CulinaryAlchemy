const dynamic = {
  getImageRoute (carrouselID: string, imageId: string) {
    return `${carrouselID}/${imageId}`
  }
}

export const carouselRoutes = {
  dynamic
}
