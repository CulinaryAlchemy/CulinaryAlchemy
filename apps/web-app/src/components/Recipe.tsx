import { Carousel } from '@/components'
import { PostLayout } from '@/layouts'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'

const testImages = [
  'https://res.cloudinary.com/dy9gxuv2j/image/upload/v1692994795/default-header.jpg',
  'https://res.cloudinary.com/dy9gxuv2j/image/upload/v1692989889/default-avatar.jpg',
  'https://res.cloudinary.com/dmjqr9trc/image/upload/v1693965462/icrymhri5admsjxi6uoa.jpg',
  'https://res.cloudinary.com/dmjqr9trc/image/upload/v1694168250/kno16gs0bjpfad6utdgh.jpg'
]
export const Recipe = () => {
  return (
    <PostLayout
      styles='recipe'
    >
      <Stack
        sx={{
          gap: '1em'
        }}
      >
        <header>
          <Carousel
            imageSources={testImages}
            height='100%'
            width='100%'
          />
        </header>
        <main>
          <Typography
            level='body2'
            sx={{
              paddingInline: '1em'
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia at neque voluptates eius enim, asperiores cumque incidunt perspiciatis consequatur voluptatum, assumenda fuga atque labore nesciunt facere. In quis qui quas!
          </Typography>
        </main>
      </Stack>
    </PostLayout>
  )
}
