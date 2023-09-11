import { IconButton, Image } from '@/components'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import Box from '@mui/joy/Box'

import { useCarousel } from './hooks'

interface IProps {
  imageSources: string[]
  width: string
  height: string
}
export const Carousel: React.FC<IProps> = ({ imageSources, width, height }) => {
  const { actualImageSource, nextImage, previousImage } = useCarousel({ imageSources })

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
        width,
        height,
        overflow: 'hidden'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(9,9,121,0) 50%, rgba(0,0,0,0.2) 100%)',
          zIndex: 800
        }}
      >
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
        <IconButton
          onClick={handleOnClickRight}
        >
          <ArrowCircleRightIcon
            sx={{
              fontSize: '1.8em'
            }}
          />
        </IconButton>
      </Box>
        <Image
          src={actualImageSource}
          alt='previous image'
          style={{
            maxHeight: '25em',
            height: '100%'
          }}
        />
    </Box>
  )
}
