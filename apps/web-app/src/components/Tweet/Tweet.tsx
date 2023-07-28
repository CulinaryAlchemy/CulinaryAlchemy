import { AppLink } from '@/components'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ReplayIcon from '@mui/icons-material/Replay'
import Button from '@mui/joy/Button'
import IconButton from '@mui/joy/IconButton'
import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'

export const Tweet = () => {
  return (
        <Sheet variant='outlined' sx={{ borderRight: 'none', borderLeft: 'none', padding: '1em', paddingBottom: '0.2em', cursor: 'pointer' }}>
            <Stack direction='row' spacing={1}>
                <Sheet sx={{ width: '2.5em', height: '2.5em', borderRadius: '100%', overflow: 'hidden' }}>
                    <img src="/logo.webp" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Sheet>
                <Stack flexGrow={1} sx={{ width: '80%' }}>
                    <Stack direction='row' alignItems='center'>
                        <Stack flexGrow={1} alignItems='start'>
                            <AppLink level='body1' sx={{ color: 'var(--joy-palette-text-primary, var(--joy-palette-neutral-800, #25252D))', textDecorationColor: 'inherit' }} color='neutral' to='/Jes015'>Jes015</AppLink>
                        </Stack>
                        <IconButton variant='plain' size="sm" color='neutral' sx={{ width: '1.171875em', height: '1.171875em' }}><MoreVertIcon /></IconButton>
                    </Stack>
                    <Typography level='body2' sx={{ maxHeight: '25em', overflow: 'hidden', textWrap: 'balance' }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur omnis molestiae distinctio dicta impedit, eaque iure, nihil aliquid fugit ipsum nam, similique reprehenderit? Soluta velit, rem porro voluptatum suscipit tempora.
                    </Typography>
                </Stack>
            </Stack>
            <Stack direction='row' justifyContent='center' mt={1}>
                <Button size='sm' variant='plain' color='neutral' startDecorator= {
                    <ChatBubbleOutlineIcon />
                }>
                    <Typography level='body2'>3</Typography>
                </Button>
                <Button size='sm' variant='plain' color='neutral' startDecorator= {
                    <ReplayIcon />
                }>
                    <Typography level='body2'>17</Typography>
                </Button>
                <Button size='sm' variant='plain' color='neutral' startDecorator= {
                    <FavoriteBorder />
                }>
                    <Typography level='body2'>100</Typography>
                </Button>
            </Stack>
        </Sheet>
  )
}
