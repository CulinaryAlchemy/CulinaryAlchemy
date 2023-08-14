import { TabPanel, TabsPage } from '@/components'

const tabNames = ['Account']

export const SettingsMain = () => {
  return (
        <main>
            <TabsPage
                tabNames={tabNames}
                tabPanels={
                    <>
                        <TabPanel value={tabNames[0]} loading={false}>
                            olaaaaaaa
                        </TabPanel>
                    </>
                }
            />
        </main>
  )
}
