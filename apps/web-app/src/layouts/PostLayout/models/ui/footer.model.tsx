import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import ReplayIcon from '@mui/icons-material/Replay'

export const CPostFooter = {
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
