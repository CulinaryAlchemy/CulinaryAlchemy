
import { TabPanel, TabsPage } from '@/components'

const tabs = ['Location', 'Preferences', 'Dietary']
// and the schemas to global schemas dir, add skeleton de joy ui
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
