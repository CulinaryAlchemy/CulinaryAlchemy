import Box from '@mui/joy/Box'
import { useEffect, useState, type CSSProperties } from 'react'
import styles from './image.module.css'

interface IProps {
  alt: string
  className?: string
  src: string
  srcBlurPlaceholder?: string
  height?: string
  width?: string
  style?: CSSProperties
}

export const Image: React.FC<IProps> = ({ srcBlurPlaceholder, src, style, ...props }) => {
  const [showPlaceholder, setShowPlaceholder] = useState(true)

  useEffect(() => {

  }, [])

  const handleOnLoadStart = () => {
    setShowPlaceholder(true)
  }

  const handleOnLoad = () => {
    setShowPlaceholder(false)
  }

  return (
    <Box
      component='div'
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
        transition: 'opacity ease'
      }}
    >
      <Box
        component='div'
        className={styles.image__loading}
        sx={{
          display: !showPlaceholder ? 'none' : 'block',
          backgroundColor: (srcBlurPlaceholder && showPlaceholder) ? 'var(--joy-palette-background-body)' : 'transparent',
          position: 'relative',
          width: '100%',
          height: '100%'
        }}
      >
        <img
          src={srcBlurPlaceholder}
          {...{ props, style }}
          className={styles.image__placeholder}
        />
      </Box>
      <img
        onLoadStart={handleOnLoadStart}
        onLoad={handleOnLoad}
        {...{ props, src }}
        className={styles.image}
        style={
          {
            display: showPlaceholder ? 'none' : 'block',
            ...style
          }
        }
      />
    </Box>
  )
}
