import { GlobalLayout } from '@/layouts'
import SentimentVeryDissatisfiedRoundedIcon from '@mui/icons-material/SentimentVeryDissatisfiedRounded'
import Box from '@mui/joy/Box/'
import Typography from '@mui/joy/Typography/'
import { metadata } from './config'

const NotFound = () => {
  return (
    <GlobalLayout newTitle={metadata.title}>
      <Box sx={{ height: '30vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <SentimentVeryDissatisfiedRoundedIcon sx={{ fontSize: '9em' }} />
        <Typography level="h1" textTransform='uppercase'>Not Found</Typography>
      </Box>
    </GlobalLayout>
  )
}
export default NotFound
