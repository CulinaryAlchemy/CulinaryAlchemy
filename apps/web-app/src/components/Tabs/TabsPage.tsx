import Box from '@mui/joy/Box'
import Tab, { tabClasses } from '@mui/joy/Tab'
import TabList from '@mui/joy/TabList'
import Tabs from '@mui/joy/Tabs'
import React, { useState } from 'react'

interface IProps {
  tabNames: string[]
  tabPanels: React.ReactNode
}
export const TabsPage: React.FC<IProps> = ({ tabNames, tabPanels }) => {
  const [index, setIndex] = useState(tabNames[0])

  return (
    <Box
      sx={{
        bgcolor: 'background.body',
        flexGrow: 1,
        overflowX: 'hidden',
        borderRadius: 'md'
      }}
    >
      <Tabs
        aria-label="Pipeline"
        value={index}
        onChange={(event, value) => { if (event != null) setIndex(value as string) }}
        sx={{ '--Tabs-gap': '0px' }}
      >
        <TabList
          variant="plain"
          sx={{
            width: '100%',
            maxWidth: 400,
            mx: 'auto',
            pt: 2,
            alignSelf: 'flex-start',
            [`& .${tabClasses.root}`]: {
              bgcolor: 'transparent',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: 'transparent'
              },
              [`&.${tabClasses.selected}`]: {
                fontWeight: 'lg',
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  zIndex: 1,
                  bottom: '-1px',
                  left: 'var(--ListItem-paddingLeft)',
                  right: 'var(--ListItem-paddingRight)',
                  height: '3px',
                  borderTopLeftRadius: '3px',
                  borderTopRightRadius: '3px',
                  bgcolor: 'primary.500'
                }
              }
            }
          }}
        >
          {tabNames.map((tabName) => (
            <Tab key={tabName} value={tabName}>{tabName}</Tab>
          ))}
        </TabList>
        <Box
          sx={(theme) => ({
            '--bg': theme.vars.palette.background.level3,
            height: '1px',
            background: 'var(--bg)',
            boxShadow: '0 0 0 100vmax var(--bg)',
            clipPath: 'inset(0 -100vmax)'
          })}
        />
        <Box
          sx={(theme) => ({
            '--bg': theme.vars.palette.background.surface,
            background: 'var(--bg)',
            boxShadow: '0 0 0 100vmax var(--bg)',
            clipPath: 'inset(0 -100vmax)'
          })}
        >
          {tabPanels}
        </Box>
      </Tabs>
    </Box>
  )
}
