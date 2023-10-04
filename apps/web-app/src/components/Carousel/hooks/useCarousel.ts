import { useState } from 'react'

interface IParams {
  imageSources: string[]
}
export const useCarousel = ({ imageSources }: IParams) => {
  const [imageIndex, setImageIndex] = useState(0)

  const nextImage = () => {
    const isTheLastImage = imageIndex === imageSources.length - 1
    if (isTheLastImage) return
    setImageIndex((lastImageIndex) => lastImageIndex + 1)
  }

  const previousImage = () => {
    const isTheFirstImage = imageIndex === 0
    if (isTheFirstImage) return
    setImageIndex((lastImageIndex) => lastImageIndex - 1)
  }

  return { nextImage, previousImage, imageIndex }
}
