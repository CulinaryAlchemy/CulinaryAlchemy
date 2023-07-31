import { GlobalLayout, MessageLayout } from '@/layouts'
import SentimentVeryDissatisfiedRoundedIcon from '@mui/icons-material/SentimentVeryDissatisfiedRounded'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography/'
import { metadata } from './config'

const NotFound = () => {
  return (
    <GlobalLayout newTitle={metadata.title}>
      <MessageLayout>
        <Stack direction='column' alignItems='center'>
          <SentimentVeryDissatisfiedRoundedIcon sx={{ fontSize: '9em' }} />
          <Typography level="h1" textTransform='uppercase'>Not Found</Typography>
        </Stack>
      </MessageLayout>
    </GlobalLayout>
  )
}
export default NotFound
