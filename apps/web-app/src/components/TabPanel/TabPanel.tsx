import { Tweet } from '@/components'
import { Typography } from '@mui/joy'
import DefaultUIPanel from '@mui/joy/TabPanel'

interface IProps {
  value: string
}
export const TabPanel: React.FC<IProps> = ({ value }) => {
  return (
        <DefaultUIPanel value={value}>
            <Typography
                level="h2"
                component="div"
                fontSize="lg"
                mb={2}
                textColor="text.primary"
            >
                <Tweet />
                <Tweet />
                <Tweet />
                <Tweet />
                <Tweet />
                <Tweet />
                <Tweet />
                <Tweet />
                <Tweet />
            </Typography>
        </DefaultUIPanel>
  )
}
