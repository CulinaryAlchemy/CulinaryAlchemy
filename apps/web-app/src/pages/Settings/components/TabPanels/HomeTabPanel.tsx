import { TabPanel } from '@/components'
import { CTabsData } from '@/pages/Settings/models/UI'

export const HomeTabPanel = () => {
  return (
        <TabPanel value={CTabsData.account.name} loading={false}>

        </TabPanel>
  )
}
