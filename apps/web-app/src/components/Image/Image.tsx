import { useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { imageCacheManagerInstance } from './services'

interface IProps {
  alt: string
  className?: string
  src: string
  srcBlurPlaceholder: string
  height?: string
  width?: string
  style?: object
}

export const Image: React.FC<IProps> = ({ srcBlurPlaceholder, ...props }) => {
  useEffect(() => {
    imageCacheManagerInstance.addImage(props.src)
  }, [props.src])

  return (
        <LazyLoadImage
            effect="blur"
            {...props}
            placeholderSrc={srcBlurPlaceholder}
            threshold={0}
            visibleByDefault={false}
        />
  )
}
