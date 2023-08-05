
import { TabPanel, TabsPage } from '@/components'
import { t } from 'i18next'

const tabs = [t('recipes'), t('tweets')]

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
