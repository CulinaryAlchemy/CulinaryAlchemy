import { useState } from 'react'
import { carouselRoutes } from '../routing'

interface IParams {
  imageSources: string[]
  carouselId: string
}
export const useCarousel = ({ imageSources, carouselId }: IParams) => {
  const [imageIndex, setImageIndex] = useState(0)

  const nextImage = () => {
    const isTheLastImage = imageIndex === imageSources.length - 1
    if (isTheLastImage) return
    setImageIndex((lastImageIndex) => {
      const newImageIndex = lastImageIndex + 1

      const element = document.getElementById(carouselRoutes.dynamic.getImageRoute(carouselId, String(newImageIndex)))

      goToElement(element as HTMLElement)

      return newImageIndex
    })
  }

  const previousImage = () => {
    const isTheFirstImage = imageIndex === 0
    if (isTheFirstImage) return
    setImageIndex((lastImageIndex) => {
      const newImageIndex = lastImageIndex - 1

      const element = document.getElementById(carouselRoutes.dynamic.getImageRoute(carouselId, String(newImageIndex)))
      goToElement(element as HTMLElement)

      return newImageIndex
    })
  }

  const goToElement = (element: HTMLElement) => {
    // @ts-expect-error firefox does not support this :(
    if (element?.scrollIntoViewIfNeeded != null) {
      // @ts-expect-error firefox does not support this :( - Firefox
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      element?.scrollIntoViewIfNeeded({ behavior: 'smooth', block: 'nearest', inline: 'start' })
    } else {
      element?.scrollIntoView({
        // @ts-expect-error firefox suckssssssss
        top: element?.offsetParent?.offsetTop as HTMLElement,
        // @ts-expect-error firefox suckssssssss
        bottom: element?.offsetParent?.offsetTop as HTMLElement,
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
      })
    }
  }

  return { nextImage, previousImage, imageIndex }
}
