import { AppInfoLink, List, TabPanel } from '@/components'
import { CTabsData, CTabsDataAccountTabPanel } from '@/pages/Settings/models/UI'


const AccountTabPanel = () => {
  return (
    <TabPanel
      routingBy='routingSystem'
      value={CTabsData.account.name}
      loading={false}
      title={CTabsData.account.traduction}
      description={CTabsData.account.description}
      showBackNavigation={false}
    >
      <main>
        <List
          items={
            Object.values(CTabsDataAccountTabPanel).map((tabData) => (
              <AppInfoLink
                title={tabData.traduction}
                description={tabData.description}
                to={tabData.to as string}
                startIcon={tabData.icon}
              />
            ))
          }
          styles={{
            items: {
              hover: {
                backgroundColor: 'var(--joy-palette-neutral-outlinedHoverBg, var(--joy-palette-neutral-100, #EBEBEF))'
              }
            }
          }}
        />
      </main>
    </TabPanel>
  )
}

export default AccountTabPanel
