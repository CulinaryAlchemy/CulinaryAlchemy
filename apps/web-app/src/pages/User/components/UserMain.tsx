
import { TabPanel, TabsPage } from '@/components'

const tabs = ['Location', 'Preferences', 'Dietary']

export const UserMain = () => {
  return (
        <main>
            <TabsPage
                tabNames={tabs}
                tabPanels={
                    <>
                        {tabs.map((tabName) => (
                            <TabPanel key={tabName} value={tabName} />
                        ))}
                    </>
                }
            />
        </main>
  )
}
