import { Loading, Tweet } from '@/components'
import { MessageLayout } from '@/layouts'
import Box from '@mui/joy/Box'
import DefaultUIPanel from '@mui/joy/TabPanel'

interface IProps {
  value: string
  loading?: boolean
  children?: React.ReactNode
}
export const TabPanel: React.FC<IProps> = ({ value, loading = true, children }) => {
  return (
    <DefaultUIPanel value={value}>
      {
        loading
          ? <TabPanelLoading />
          : <>
            {children}
            <Tweet />
            <Tweet />
            <Tweet />
            <Tweet />
            <Tweet />
            <Tweet />
            <Tweet />
            <Tweet />
            <Tweet />
          </>
      }

    </DefaultUIPanel>
  )
}

const TabPanelLoading = () => {
  return (
    <Box sx={{ position: 'relative', backgroundColor: 'var(--joy-palette-background-surface)', height: '10.5em' }}>
      <MessageLayout><Loading size='md' /></MessageLayout>
    </Box>
  )
}
