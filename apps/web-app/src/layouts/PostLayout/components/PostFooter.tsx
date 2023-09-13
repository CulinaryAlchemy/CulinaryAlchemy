import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import ReplayIcon from '@mui/icons-material/Replay'
import Button from '@mui/joy/Button'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'

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

export const PostFooter = () => {
  return (
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
  )
}
