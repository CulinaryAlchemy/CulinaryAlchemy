import { IconButton, Image } from '@/components'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import Box from '@mui/joy/Box'

import { useCarousel } from './hooks'

interface IStyles {
  borderRadius?: string
  width: string
  height: string
}

interface IProps {
  imageSources: string[]
  styles: IStyles
}
export const Carousel: React.FC<IProps> = ({ imageSources, styles }) => {
  const { actualImageSource, nextImage, previousImage, imageIndex } = useCarousel({ imageSources })

  const handleOnClickRight = () => {
    nextImage()
  }

  const handleOnClickLeft = () => {
    previousImage()
  }
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        width: styles.width,
        height: styles.height,
        overflow: 'hidden',
        borderRadius: styles.borderRadius
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: imageIndex !== 0 ? 'space-between' : 'flex-end',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          background: 'linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(9,9,121,0) 50%, rgba(0,0,0,0.2) 100%)',
          zIndex: 800
        }}
      >
        {
          imageIndex !== 0 &&
            <IconButton
              onClick={handleOnClickLeft}
            >
              <ArrowCircleLeftIcon
                sx={{
                  height: '100%',
                  fontSize: '1.8em'
                }}
              />
            </IconButton>
        }
        {
          imageIndex !== imageSources.length - 1 &&
          <IconButton
            onClick={handleOnClickRight}
          >
            <ArrowCircleRightIcon
              sx={{
                fontSize: '1.8em'
              }}
            />
          </IconButton>
        }
      </Box>
      <Image
        src={actualImageSource}
        alt='previous image'
        style={{
          height: '100%',
          width: '100%',
          objectFit: 'cover'
        }}
      />
    </Box>
  )
}
