import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import React from 'react'

interface IProps {
  imageCount: number
  imageIndex: number
  setNewImageIndex: (index: number) => void
}
const CircleCountButtons: React.FC<IProps> = ({ imageCount, imageIndex, setNewImageIndex }) => {
  const handleOnClickButton = (actualImageIndex: number) => () => {
    setNewImageIndex(actualImageIndex)
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        zIndex: 800,
        paddingBottom: '0.4em',
        gap: '0.4em',
        ':after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '400%',
          background: 'linear-gradient(0deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%)',
          zIndex: -100
        }
      }}
    >
      {Array(imageCount).fill(null).map((_, index) => (
        <Button
          key={index}
          onClick={handleOnClickButton(index)}
          color='neutral'
          sx={{
            borderRadius: '100%',
            background: 'rgb(216, 216, 223)',
            opacity: imageIndex === index ? 1 : 0.5,
            flexShrink: 0,
            padding: 'none',
            minHeight: '0.8em',
            width: '0.8em',
            paddingBlock: '0px',
            paddingInline: '0px',
            '&:focus, &:hover': {
              scale: '20px'
            }
          }}
        />
      ))
      }
    </Box>
  )
}


export default CircleCountButtons
