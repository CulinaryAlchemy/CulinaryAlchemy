import { Loading } from '@/components'
import { MessageLayout } from '@/layouts'
import Box from '@mui/joy/Box'

import { DeterminateTabPanel, TabPanelHeader } from './components'



type TRoutingBy = 'defaultUISystem' | 'routingSystem' // if routing system is enabled, it will render by route otherwise by UI Tabs system

interface IProps {
  value?: string
  loading?: boolean
  children?: React.ReactNode
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  showBackNavigation?: boolean
  routingBy: TRoutingBy
}

export const TabPanel: React.FC<IProps> = ({ title, description, showBackNavigation, value, loading = true, children, routingBy }) => {
  return (
    <DeterminateTabPanel routingBy={routingBy} value={value}>
      <TabPanelHeader {...{ title, description, showBackNavigation }} />
      {
        loading
          ? <TabPanelLoading />
          : children
      }

    </DeterminateTabPanel>
  )
}

const TabPanelLoading = () => {
  return (
    <Box sx={{ position: 'relative', backgroundColor: 'var(--joy-palette-background-surface)', height: '10.5em' }}>
      <MessageLayout><Loading size='md' /></MessageLayout>
    </Box>
  )
}
