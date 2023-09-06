
import { TabPanel, TabsPage } from '@/components'
import { CTabsData } from '@/pages/User/models/UI/'



export const UserMain = () => {
  return (
        <main>
            <TabsPage
                defaultTab={CTabsData.recipes.name}
                type='no-routing'
                tabsData={Object.values(CTabsData)}
                tabPanels={
                    <>
                        {Object.values(CTabsData).map((tabName) => (
                            <TabPanel routingBy='defaultUISystem' key={tabName.name} value={tabName.name} />
                        ))}
                    </>
                }
                styles={{
                  background: 'theme',
                  direction: 'column',
                  tabs: {
                    names: {
                      direction: 'row'
                    }
                  }
                }}
            />
        </main>
  )
}
