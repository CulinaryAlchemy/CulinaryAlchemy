import { Suspense, lazy } from 'react'

import { TabsPage } from '@/components'
import { CTabsData } from '@/pages/Settings/models/UI'
import Box from '@mui/joy/Box'

const AccountTabPanel = lazy(() => import('@/pages/Settings/components/TabPanels/AccountTabPanel'))

export const SettingsMain = () => {
  return (
        <main>
            <Box>
                <TabsPage
                    tabsData={Object.values(CTabsData)}
                    tabPanels={
                        <>
                        <Suspense>
                            <AccountTabPanel />
                        </Suspense>
                        </>
                    }
                />
            </Box>
        </main>
  )
}
