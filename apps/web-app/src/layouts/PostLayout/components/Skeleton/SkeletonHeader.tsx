import MoreVertIcon from '@mui/icons-material/MoreVert'
import IconButton from '@mui/joy/IconButton'
import Sheet from '@mui/joy/Sheet'
import Skeleton from '@mui/joy/Skeleton'
import Stack from '@mui/joy/Stack'

export const PostLayoutSkeletonHeader = () => {
  return (
      <Sheet
        component='header'
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '0.4em',
          justifyContent: 'space-between',
          paddingInline: '1em',
          alignItems: 'center',
          width: '100%'
        }}
      >
        <Stack
          sx={{
            flexDirection: 'row',
            gap: '0.5em',
            alignItems: 'center'
          }}
        >
          <Sheet sx={{ flexShrink: 0, width: '2.5em', height: '2.5em', borderRadius: '100%', overflow: 'hidden' }}>
            <Skeleton variant='circular' sx={{ width: '100%', height: '100%' }} />
          </Sheet>
          <Skeleton sx={{ flexShrink: 0, flexBasis: '100%' }} variant='text' level='body1' width='5em' />
        </Stack>

        <IconButton
          variant='plain'
          size="sm"
          color='neutral'
          sx={{
            width: '1.171875em',
            height: '1.171875em'
          }}
        >
          <MoreVertIcon />
        </IconButton>
      </Sheet>
  )
}
