import MoreVertIcon from '@mui/icons-material/MoreVert'
import IconButton from '@mui/joy/IconButton'
import Sheet from '@mui/joy/Sheet'
import Skeleton from '@mui/joy/Skeleton'
import Stack from '@mui/joy/Stack'
import { PostFooter, PostHeader } from './components'

interface IStyles {
  border?: 'none'
  gap?: string
  cursor?: 'pointer'
}

interface IProps {
  children: React.ReactNode
  styles?: IStyles
  isLoading: boolean
}

export const PostLayout: React.FC<IProps> = ({ children, styles, isLoading }) => {
  if (isLoading) {
    return <PostLayoutSkeleton />
  }

  return (
    <Sheet
      component='article'
      variant='outlined'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: styles?.gap ?? '0.5em',
        border: styles?.border,
        borderRight: 'none',
        borderLeft: 'none',
        paddingBottom: '0.2em',
        cursor: styles?.cursor,
        width: '100%',
        paddingBlock: '1em'
      }}
    >
      <PostHeader />
      <main>
        <Stack
          sx={{
            width: '100%'
          }}
        >
          {children}
        </Stack>
      </main>
      <PostFooter />
    </Sheet>
  )
}

const PostLayoutSkeleton = () => {
  return (
    <Sheet variant='outlined' sx={{ borderRight: 'none', borderLeft: 'none', padding: '1em', paddingBottom: '0.2em', cursor: 'pointer' }}>
      <Stack direction='row' spacing={1}>
        <Sheet sx={{ width: '2.5em', height: '2.5em', borderRadius: '100%', overflow: 'hidden' }}>
          <Skeleton variant='circular' sx={{ width: '100%', height: '100%' }} />
        </Sheet>
        <Stack flexGrow={1} sx={{ width: '80%' }}>
          <Stack direction='row' alignItems='center'>
            <Stack flexGrow={1} alignItems='start'>
              <Skeleton variant='text' level='body1' width='25%' />
            </Stack>
            <IconButton variant='plain' size="sm" color='neutral' sx={{ width: '1.171875em', height: '1.171875em' }}><MoreVertIcon /></IconButton>
          </Stack>
          <Stack>
            <Skeleton variant='text' level='body3' />
            <Skeleton variant='text' level='body3' />
            <Skeleton variant='text' level='body3' />
            <Skeleton variant='text' level='body3' width='80%' />
          </Stack>
        </Stack>
      </Stack>
      <Stack direction='row' justifyContent='center' mt={1}>
        <Skeleton variant='text' level='h5' />
      </Stack>
    </Sheet>
  )
}
