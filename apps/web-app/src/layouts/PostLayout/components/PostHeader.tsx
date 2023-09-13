import { AppLink, Image } from '@/components'
import { useGlobalAuth } from '@/hooks'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import IconButton from '@mui/joy/IconButton'
import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'

export const PostHeader = () => {
  const { user } = useGlobalAuth()

  return (
        <header>
            <Stack sx={{
              flexDirection: 'row',
              gap: '0.4em',
              justifyContent: 'space-between',
              paddingInline: '1em'
            }}
            >
                <Sheet sx={{ width: '2.5em', height: '2.5em', borderRadius: '100%', overflow: 'hidden' }}>
                    <Image
                        src={user?.avatar as string}
                        srcBlurPlaceholder={user?.avatarBlur as string}
                        alt="user image"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                    />
                </Sheet>
                <Stack flexGrow={1} direction='row' alignItems='center'>
                    <Stack flexGrow={1} alignItems='start'>
                        <AppLink
                            level='body1'
                            sx={{
                              color: 'var(--joy-palette-text-primary, var(--joy-palette-neutral-800, #25252D))',
                              textDecorationColor: 'inherit'
                            }}
                            color='neutral'
                            to={`/${user?.username as string}`}
                        >
                            {user?.username}
                        </AppLink>
                    </Stack>
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
            </Stack>
        </header>
  )
}
