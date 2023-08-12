import { TabPanel, TabsPage } from '@/components'

const tabNames = ['Account']

export const SettingsMain = () => {
  return (
        <main>
            <TabsPage
                tabNames={tabNames}
                tabPanels={
                    tabNames.map((tabName) => (
                        <TabPanel key={tabName} value={tabName} />
                    ))
                }
            />
        </main>
  )
}
