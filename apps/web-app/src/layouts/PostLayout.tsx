import { AppLink, Image } from '@/components'
import { useGlobalAuth } from '@/hooks'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ReplayIcon from '@mui/icons-material/Replay'
import Button from '@mui/joy/Button'
import IconButton from '@mui/joy/IconButton'
import Sheet from '@mui/joy/Sheet'
import Skeleton from '@mui/joy/Skeleton'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import React, { useState } from 'react'

interface IProps {
  children: React.ReactNode
}

const tweetData = {
  buttons: [
    {
      name: 'comments',
      icon: <ChatBubbleOutlineIcon />
    },
    {
      name: 'retweet',
      icon: <ReplayIcon />
    },
    {
      name: 'likes',
      icon: <FavoriteBorder />
    }
  ]
}
export const PostLayout: React.FC<IProps> = ({ children }) => {
  const { user } = useGlobalAuth()
  const [isLoading] = useState(false)

  if (isLoading) {
    return <PostLayoutSkeleton />
  }

  return (
        <Sheet variant='outlined' sx={{ borderRight: 'none', borderLeft: 'none', padding: '1em', paddingBottom: '0.2em', cursor: 'pointer', width: '100%' }}>
            <Stack direction='row' spacing={1}>
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
                    <img />
                </Sheet>
                <Stack flexGrow={1} sx={{ width: '80%' }}>
                    <Stack direction='row' alignItems='center'>
                        <Stack flexGrow={1} alignItems='start'>
                            <AppLink level='body1' sx={{ color: 'var(--joy-palette-text-primary, var(--joy-palette-neutral-800, #25252D))', textDecorationColor: 'inherit' }} color='neutral' to={`/${user?.username as string}`}>{user?.username}</AppLink>
                        </Stack>
                        <IconButton variant='plain' size="sm" color='neutral' sx={{ width: '1.171875em', height: '1.171875em' }}><MoreVertIcon /></IconButton>
                    </Stack>
                    {children}
                </Stack>
            </Stack>
            <footer>
                <Stack direction='row' justifyContent='center' mt={1}>
                    {
                        tweetData.buttons.map((button) => (
                            <Button key={button.name} size='sm' variant='plain' color='neutral' startDecorator={
                                button.icon
                            }>
                                <Typography level='body2'>3</Typography>
                            </Button>
                        ))
                    }
                </Stack>
            </footer>
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
