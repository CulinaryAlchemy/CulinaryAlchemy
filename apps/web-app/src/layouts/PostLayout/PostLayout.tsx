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
import React, { lazy, useState } from 'react'

interface IProps {
  children: React.ReactNode
  styles: 'tweet' | 'recipe'
}

const postData = {
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

const PostHeaderForTweet = lazy(() => import('@/layouts/PostLayout/components/PostHeaderForTweet'))
const PostHeaderForRecipe = lazy(() => import('@/layouts/PostLayout/components/PostHeaderForRecipe'))

export const PostLayout: React.FC<IProps> = ({ children, styles }) => {
  const [isLoading] = useState(false)

  if (isLoading) {
    return <PostLayoutSkeleton />
  }

  return (
    <Sheet
      variant='outlined'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5em',
        borderRight: 'none',
        borderLeft: 'none',
        paddingBottom: '0.2em',
        cursor: 'pointer',
        width: '100%',
        paddingBlock: '1em'
      }}
    >
      <header>
        <Stack sx={{
          flexDirection: 'row',
          gap: '1em',
          justifyContent: 'space-between',
          paddingInline: '1em'
        }}
        >
          {styles === 'tweet' && <PostHeaderForTweet />}
          {styles === 'recipe' && <PostHeaderForRecipe />}
          <IconButton variant='plain' size="sm" color='neutral' sx={{ width: '1.171875em', height: '1.171875em' }}><MoreVertIcon /></IconButton>
        </Stack>
      </header>
      <main>
        <Stack sx={{ width: '100%' }}>
          {children}
        </Stack>
      </main>
      <footer>
        <Stack sx={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: '1em',
          paddingInline: '1em'
        }}
        >
          {
            postData.buttons.map((button) => (
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
