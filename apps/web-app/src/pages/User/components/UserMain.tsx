
import { TabPanel, TabsPage } from '@/components'
import { CTabsData } from '@/pages/User/models/UI/'



export const UserMain = () => {
  return (
        <main>
            <TabsPage
                tabsData={Object.values(CTabsData)}
                tabPanels={
                    <>
                        {Object.values(CTabsData).map((tabName) => (
                            <TabPanel key={tabName.name} value={tabName.name} />
                        ))}
                    </>
                }
            />
        </main>
  )
}
