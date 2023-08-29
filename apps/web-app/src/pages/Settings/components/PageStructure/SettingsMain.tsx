import { TabsPage } from '@/components'
import { CTabsData } from '@/pages/Settings/models/UI'
import { SettingsRouting } from '@/pages/Settings/routing'
import Box from '@mui/joy/Box'
import { useLocation } from 'react-router-dom'

export const SettingsMain = () => {
  const loc = useLocation()

  const defaultTabName = Object.values(CTabsData).find((tabData) => tabData.to?.includes(loc.pathname))?.name ?? CTabsData.home.name

  return (
    <main>
      <Box sx={{ position: 'relative' }}>
        <TabsPage
          defaultTab={defaultTabName}
          type='routing'
          tabsData={Object.values(CTabsData)}
          tabPanels={
            <SettingsRouting />
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
