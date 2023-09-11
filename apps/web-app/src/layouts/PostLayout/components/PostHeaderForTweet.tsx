import { AppLink, Image } from '@/components'
import { useGlobalAuth } from '@/hooks'
import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'

const PostHeaderForTweet = () => {
  const { user } = useGlobalAuth()

  return (
        <>
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
        </>
  )
}

export default PostHeaderForTweet
