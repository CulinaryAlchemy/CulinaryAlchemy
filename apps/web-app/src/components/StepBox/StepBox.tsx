import { Carousel } from '@/components'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'
import { StepButton } from './components'

const testImages = [
  'https://res.cloudinary.com/dy9gxuv2j/image/upload/v1692994795/default-header.jpg',
  'https://res.cloudinary.com/dy9gxuv2j/image/upload/v1692989889/default-avatar.jpg',
  'https://res.cloudinary.com/dmjqr9trc/image/upload/v1693965462/icrymhri5admsjxi6uoa.jpg',
  'https://res.cloudinary.com/dmjqr9trc/image/upload/v1694168250/kno16gs0bjpfad6utdgh.jpg'
]

export const StepBox = () => {
  return (
        <Box
            sx={{
              display: 'flex',
              flexDirection: 'column'
            }}
        >
            <header>
                <Box
                    sx={{
                      padding: '1em'
                    }}
                >
                    <Typography
                        level='h4'
                        sx={{
                          fontWeight: 600,
                          textTransform: 'uppercase'
                        }}
                    >
                        La paste cream
                    </Typography>
                    <Typography
                        level='body3'
                    >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia at neque voluptates eius enim, asperiores cumque incidunt perspiciatis consequatur voluptatum, assumenda fuga atque labore nesciunt facere. In quis qui quas!
                    </Typography>
                </Box>
            </header>
            <main>
                <Box sx={{
                  height: '25em',
                  overflow: 'hidden'
                }}>
                    <Carousel
                        imageSources={testImages}
                        styles={{
                          height: '100%',
                          width: '100%'
                        }}
                    />
                </Box>
            </main>
            <footer>
                <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.2em',
                      paddingInline: '1em',
                      paddingTop: '0.5em'
                    }}
                >
                    <Typography
                        sx={{
                          fontWeight: 600,
                          margin: 0
                        }}
                        level='h5'
                    >
                        Steps
                    </Typography>
                    <Box
                        sx={{
                          display: 'flex',
                          flexWrap: 'nowrap',
                          gap: '1em',
                          overflowX: 'auto'
                        }}
                    >
                        <StepButton />
                        <StepButton />
                        <StepButton />
                        <StepButton />
                        <StepButton />
                        <StepButton />
                        <StepButton />
                        <StepButton />
                        <StepButton />
                        <StepButton />
                        <StepButton />
                        <StepButton />
                        <StepButton />
                    </Box>
                </Box>
            </footer>
        </Box>
  )
}

