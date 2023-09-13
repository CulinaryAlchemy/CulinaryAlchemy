import { AppLink, Carousel } from '@/components'
import { PostLayout } from '@/layouts'
import { CFrontRoutes } from '@/routing'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'

interface IStyles {
  border?: 'none'
  gap?: string
  content: {
    paddingInline?: string
    flexDirection: 'column' | 'row'
    gap?: string
    carrousel: {
      maxWidth: string
      borderRadius?: string
    }
    informationSection: {
      paddingInline?: string
    }
  }
}

interface IProps {
  styles: IStyles
}

const testImages = [
  'https://res.cloudinary.com/dy9gxuv2j/image/upload/v1692994795/default-header.jpg',
  'https://res.cloudinary.com/dy9gxuv2j/image/upload/v1692989889/default-avatar.jpg',
  'https://res.cloudinary.com/dmjqr9trc/image/upload/v1693965462/icrymhri5admsjxi6uoa.jpg',
  'https://res.cloudinary.com/dmjqr9trc/image/upload/v1694168250/kno16gs0bjpfad6utdgh.jpg'
]

export const Recipe: React.FC<IProps> = ({ styles }) => {
  return (
    <PostLayout
      styles={{
        border: styles.border,
        gap: styles.gap
      }}
    >
      <Stack
        sx={{
          flexDirection: {
            md: styles.content.flexDirection,
            sx: 'column'
          },
          gap: styles.content.gap,
          paddingInline: styles.content.paddingInline
        }}
      >
        <section>
          <Box sx={{
            height: '25em',
            maxWidth: {
              md: styles.content.carrousel.maxWidth,
              sx: '100%'
            },
            overflow: 'hidden'
          }}>
            <Carousel
              imageSources={testImages}
              styles={{
                height: '100%',
                width: '100%',
                borderRadius: styles.content.carrousel.borderRadius
              }}
            />
          </Box>
        </section>
        <section>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.3em',
              paddingInline: styles.content.informationSection.paddingInline
            }}
          >
            <header>
              <Typography
                level='h4'
                sx={{
                  fontWeight: 600,
                  textTransform: 'uppercase'
                }}
              >
                <AppLink to={CFrontRoutes.Dynamic.recipe('holaaa')} sx={{ color: 'var(--joy-palette-text-primary, var(--joy-palette-neutral-800, #25252D)) !important' }} >
                  La paste cream
                </AppLink>
              </Typography>
            </header>
            <main>
              <Typography
                level='body2'
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia at neque voluptates eius enim, asperiores cumque incidunt perspiciatis consequatur voluptatum, assumenda fuga atque labore nesciunt facere. In quis qui quas!
              </Typography>
            </main>
            <footer>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'end'
                }}
              >
                <Button
                color='warning'
                variant='soft'
                >
                  Start cooking
                </Button>
              </Box>
            </footer>
          </Box>
        </section>
      </Stack>
    </PostLayout>
  )
}
