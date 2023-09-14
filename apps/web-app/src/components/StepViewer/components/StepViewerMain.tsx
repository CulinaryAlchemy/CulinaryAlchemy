import { ContentLayout } from '@/layouts/ContentLayout'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'

export const StepViewerMain = () => {
  return (
    <Box
      component='main'
      sx={{
        display: 'flex',
        width: '100%',
        position: 'relative',
        height: '100%',
        whiteSpace: 'nowrap',
        alignSelf: 'stretch',
        flexGrow: 1,
        scrollBehavior: 'smooth',
        overflowX: 'hidden'
      }}
    >
      {
        Array(5).fill(null).map((_, index) => (
          <ContentLayout
            key={index}
            id={String(index)}
            styles={{
              paddingInline: '1em',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom: '3em',
              gap: '1em',
              carrousel: {
                maxWidth: '25em',
                borderRadius: '0.5em'
              },
              informationSection: {
                paddingInline: '0',
                alignSelf: 'start'
              }
            }}

            information={
              <Box
                sx={{
                  maxWidth: '35em'
                }}
              >
                <Typography
                  level='h2'
                >
                  Sal
                </Typography>
                <Typography
                  level='body2'
                >Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam illo sint alias asperiores amet, vitae corporis, sunt velit vel ipsam porro. Facilis atque corporis quod vel ipsa expedita sed dolore?</Typography>
                <a
                  href={`#${index - 1}`}
                >
                  Previous
                </a>
                  -
                <a
                  href={`#${index + 1}`}
                >
                  Next
                </a>
              </Box>
            }
          />
        ))
      }
    </Box>
  )
}
