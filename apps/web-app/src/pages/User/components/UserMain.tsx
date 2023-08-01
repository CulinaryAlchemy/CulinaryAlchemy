
import { TabPanel, TabsPage } from '@/components'

const tabs = ['Recipes', 'Tweets']

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
