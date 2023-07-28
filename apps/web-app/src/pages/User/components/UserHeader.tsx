import MailOutlineIcon from '@mui/icons-material/MailOutline'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import IconButton from '@mui/joy/IconButton'
import Link from '@mui/joy/Link'
import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'

export const UserHeader = () => {
  return (
        <header>
            <Box sx={{ height: '10em', backgroundColor: 'var(--joy-palette-neutral-outlinedBorder)', overflow: 'hidden' }}>
              <img src="/wallpaper.webp" alt="wallpaper image" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
            </Box>
            <Stack sx={{ paddingX: '1em' }}>
              <Stack direction='row' sx={{ justifyContent: 'space-between', paddingTop: '0.1em' }}>
                <Stack direction='row' alignItems='center' spacing={0.5}>
                  <Sheet variant='outlined' sx={{ width: '8.34375em', height: '8.34375em', borderRadius: '100%', backgroundColor: 'black', marginTop: '-33%', overflow: 'hidden' }}>
                    <img src="/logo.webp" alt="logo image" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                  </Sheet>
                  <Typography level='h6'>Jes015</Typography>
                </Stack>
                <Stack direction='row' alignItems='center' spacing={1}>
                  <IconButton variant='outlined' color='neutral'><MoreVertIcon /></IconButton>
                  <IconButton variant='outlined' color='neutral'><MailOutlineIcon /></IconButton>
                  <Button variant='outlined' color='neutral'>Follow</Button>
                </Stack>
              </Stack>
              <Stack spacing={1} mt={1}>
                <Typography level='body3'>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse quam blanditiis quidem laboriosam neque commodi reiciendis quod, perferendis porro, omnis non eligendi doloremque expedita vel quibusdam? Autem aliquid et adipisci?
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
