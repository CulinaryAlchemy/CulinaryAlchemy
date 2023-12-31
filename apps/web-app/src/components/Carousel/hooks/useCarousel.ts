import { useState } from 'react'

interface IParams {
  imageSourcesLength: number
}

export const useCarousel = ({ imageSourcesLength }: IParams) => {
  const [imageIndex, setImageIndex] = useState(0)

  const nextImage = () => {
    const isTheLastImage = imageIndex === imageSourcesLength - 1
    if (isTheLastImage) return
    setImageIndex((lastImageIndex) => lastImageIndex + 1)
  }

  const previousImage = () => {
    const isTheFirstImage = imageIndex === 0
    if (isTheFirstImage) return
    setImageIndex((lastImageIndex) => lastImageIndex - 1)
  }

  const setNewImageIndex = (index: number) => {
    setImageIndex(index)
  }

  return { nextImage, previousImage, imageIndex, setNewImageIndex }
}
