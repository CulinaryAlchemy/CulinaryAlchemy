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
                            <div id={CTabsData.text.name}>
                                olaaaaaaaaa
                            </div>
                            <div id={CTabsData.text.name}>
                                olaaaaaaaaa
                            </div>
                        </Suspense>
                        </>
                    }
                    styles={{
                      background: 'transparent',
                      direction: 'row',
                      maxWidth: '55em',
                      borderRadius: '0.4em',
                      borderColor: 'outlined',
                      tabs: {
                        names: {
                          direction: 'column',
                          element: {
                            borderRadius: '0px',
                            height: '3em',
                            borderColor: 'outlined',
                            hover: {
                              backgroundColor: 'default'
                            },
                            selected: {
                              borderRight: true,
                              backgroundColor: 'default',
                              underLineDisplay: 'none'
                            }
                          }
                        }
                      }
                    }}
                />
            </Box>
        </main>
  )
}
