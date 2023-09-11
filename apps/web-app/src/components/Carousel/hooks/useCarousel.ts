import { useRef, useState } from 'react'

interface IParams {
  imageSources: string[]
}
export const useCarousel = ({ imageSources }: IParams) => {
  const imageIndex = useRef(0)
  const [actualImageSource, setActualImage] = useState<string>(imageSources[imageIndex.current])

  const nextImage = () => {
    const isTheLastImage = imageIndex.current === imageSources.length - 1
    if (isTheLastImage) return
    imageIndex.current += 1
    setActualImage(imageSources[imageIndex.current])
  }

  const previousImage = () => {
    const isTheFirstImage = imageIndex.current === 0
    if (isTheFirstImage) return
    imageIndex.current -= 1
    setActualImage(imageSources[imageIndex.current])
  }

  return { actualImageSource, nextImage, previousImage }
}
