import { Loading, Tweet } from '@/components'
import { MessageLayout } from '@/layouts'
import Box from '@mui/joy/Box'
import DefaultUIPanel from '@mui/joy/TabPanel'
import { useState } from 'react'

interface IProps {
  value: string
}
export const TabPanel: React.FC<IProps> = ({ value }) => {
  const [loading] = useState(true)

  return (
    <DefaultUIPanel value={value}>
      {
        loading
          ? <TabPanelLoading />
          : <>
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
