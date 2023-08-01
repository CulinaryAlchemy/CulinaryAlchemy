import { type IUser } from '@/models'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import IconButton from '@mui/joy/IconButton'
import Link from '@mui/joy/Link'
import Sheet from '@mui/joy/Sheet'
import Skeleton from '@mui/joy/Skeleton'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'

interface IProps {
  data: IUser | undefined
  isLoading?: boolean
}
export const UserHeader: React.FC<IProps> = ({ data, isLoading = false }) => {
  if (isLoading || data == null) {
    return <UserHeaderSkeleton />
  }

  return (
    <header>
      <Box sx={{ height: '10em', backgroundColor: 'var(--joy-palette-neutral-outlinedBorder)', overflow: 'hidden' }}>
        <img src="/wallpaper.webp" alt="wallpaper image" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
      </Box>
      <Stack sx={{ paddingX: '1em', paddingY: '0.5em' }}>
        <Stack direction='row' sx={{ justifyContent: 'space-between', paddingTop: '0.1em' }}>
          <Stack direction='row' alignItems='center' spacing={0.5}>
            <Sheet variant='outlined' sx={{ width: '8.34375em', height: '8.34375em', borderRadius: '100%', border: '0.125em solid var(--joy-palette-background-surface)', backgroundColor: 'black', marginTop: '-33%', overflow: 'hidden' }}>
              <img src="/logo.webp" alt="logo image" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
            </Sheet>
            <Typography level='h6'>{data.username}</Typography>
          </Stack>
          <Stack direction='row' alignItems='center' spacing={1}>
            <IconButton variant='outlined' color='neutral'><MoreVertIcon /></IconButton>
            <IconButton variant='outlined' color='neutral'><MailOutlineIcon /></IconButton>
            <Button variant='outlined' color='neutral'>Follow</Button>
          </Stack>
        </Stack>
        <Stack spacing={1} mt={1}>
          <Typography level='body3' sx={{ maxHeight: '4.7em', overflow: 'hidden' }}>
            {data.description != null ? data.description : 'No description'}
          </Typography>
          <Stack direction='row' spacing={1}>
            <Link level='body3' href='https://www.google.com' target='_blank'>Twitter</Link>
            <Link level='body3' href='https://www.google.com' target='_blank'>Facebook</Link>
            <Link level='body3' href='https://www.google.com' target='_blank'>Instagram</Link>
            <Link level='body3' href='https://www.google.com' target='_blank'>Social</Link>
          </Stack>
        </Stack>
      </Stack>
    </header>
  )
}

const UserHeaderSkeleton = () => {
  return (
    <>
      <Box sx={{ height: '10em', backgroundColor: 'var(--joy-palette-neutral-outlinedBorder)', overflow: 'hidden' }}>
        <Skeleton height='100%' width='100%' variant='rectangular' />
      </Box>
      <Stack sx={{ paddingX: '1em' }}>
        <Stack direction='row' sx={{ justifyContent: 'space-between', paddingTop: '0.1em' }}>
          <Stack direction='row' alignItems='center' spacing={0.5}>
            <Sheet variant='outlined' sx={{ width: '8.34375em', height: '8.34375em', borderRadius: '100%', backgroundColor: 'black', marginTop: '-33%', overflow: 'hidden' }}>
              <Skeleton width='100%' height='100%' />
            </Sheet>
            <Typography level='h6'>Loading</Typography>
          </Stack>
          <Stack direction='row' alignItems='center' spacing={1}>
            <IconButton variant='outlined' color='neutral'><MoreVertIcon /></IconButton>
            <IconButton variant='outlined' color='neutral'><MailOutlineIcon /></IconButton>
            <Button variant='outlined' color='neutral'>Follow</Button>
          </Stack>
        </Stack>
        <Stack mt={1}>
          <Skeleton variant='rectangular' sx={{ height: '4.7em', overflow: 'hidden' }} />
          <Stack direction='row' spacing={1} sx={{ width: '50%' }}>
            <Skeleton variant='text' level='body4' />
            <Skeleton variant='text' level='body4' />
            <Skeleton variant='text' level='body4' />
          </Stack>
        </Stack>
      </Stack>
    </>
  )
}
