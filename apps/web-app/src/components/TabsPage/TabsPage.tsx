import { TabListElement } from '@/components/TabsPage/components'
import { type TTabArray, type TTabPageType } from '@/models/UI'
import Box from '@mui/joy/Box'
import { tabClasses } from '@mui/joy/Tab'
import TabList from '@mui/joy/TabList'
import Tabs from '@mui/joy/Tabs'
import React, { useState } from 'react'

interface IStyles {
  background: 'transparent' | 'theme'
  direction: 'column' | 'row'
  maxWidth?: string
  borderRadius?: string
  borderColor?: 'outlined' | 'transparent'
  tabs: {
    names: {
      direction: 'column' | 'row'
      element?: {
        borderRadius?: string
        backgroundColor?: string
        height?: string
        borderColor?: 'outlined' | 'transparent'
        hover?: {
          backgroundColor?: 'default' | 'transparent'
        }
        selected?: {
          borderRight?: boolean
          backgroundColor?: 'default' | 'transparent'
          underLineDisplay?: 'block' | 'none'
        }
      }
    }
  }
}

interface IProps {
  defaultTab: string
  type: TTabPageType
  tabsData: TTabArray
  tabPanels: React.ReactNode
  styles: IStyles
}

export const TabsPage: React.FC<IProps> = ({ defaultTab, type, tabsData, tabPanels, styles }) => {
  const [index, setIndex] = useState(defaultTab)

  return (
    <Box
      sx={{
        bgcolor: 'background.body',
        flexGrow: 1,
        overflowX: 'hidden',
        border: styles.borderColor && '0.1em solid var(--joy-palette-neutral-outlinedBorder, var(--joy-palette-neutral-200, #D8D8DF))',
        borderRadius: styles.borderRadius ?? 'md',
        maxWidth: styles.maxWidth,
        width: '100%',
        mx: 'auto'
      }}
    >
      <Tabs
        component={Box}
        aria-label="Pipeline"
        value={index}
        onChange={(event, value) => { if (event != null) setIndex(value as string) }}
        sx={{
          '--Tabs-gap': '0px',
          display: 'flex',
          flexDirection: {
            md: styles.direction
          }
        }}
      >
        <TabList
          variant="plain"
          sx={{
            width: '100%',
            maxWidth: 400,
            mx: 'auto',
            alignSelf: 'flex-start',
            flexDirection: {
              md: styles.tabs.names.direction
            },
            [`& .${tabClasses.root}`]: {
              bgcolor: 'bg.body',
              zIndex: 100,
              boxShadow: 'none',
              borderBottom: `0.1em solid ${styles.tabs.names.element?.borderColor === 'outlined' ? 'var(--joy-palette-neutral-outlinedBorder, var(--joy-palette-neutral-200, #D8D8DF))' : 'transparent'}`,
              borderRadius: styles.tabs.names.element?.borderRadius,
              height: styles.tabs.names.element?.height,
              '&:hover': {
                bgcolor: {
                  md: styles.tabs.names.element?.hover?.backgroundColor === 'default' ? 'var(--joy-palette-neutral-outlinedHoverBg, var(--joy-palette-neutral-100, #EBEBEF))' : 'transparent'
                }
              },
              [`&.${tabClasses.selected}`]: {
                fontWeight: 'lg',
                borderRight: {
                  md: styles.tabs.names.element?.selected?.borderRight && '0.2em solid var(--joy-palette-primary-500)'
                },
                bgcolor: {
                  md: styles.tabs.names.element?.selected?.backgroundColor === 'default' ? 'var(--joy-palette-neutral-outlinedHoverBg, var(--joy-palette-neutral-100, #EBEBEF))' : 'transparent'
                },
                '&:before': {
                  content: '""',
                  display: {
                    md: styles.tabs.names.element?.selected?.underLineDisplay ?? 'block'
                  },
                  position: 'absolute',
                  zIndex: 1,
                  bottom: '-1px',
                  left: 'var(--ListItem-paddingLeft)',
                  right: 'var(--ListItem-paddingRight)',
                  borderTopLeftRadius: '3px',
                  borderTopRightRadius: '3px',
                  height: '3px',
                  bgcolor: 'primary.500'
                }
              }
            }
          }}
        >
          {
            tabsData.map((tabData) => {
              return (<TabListElement
                type={type}
                key={tabData.name}
                tabData={tabData}
                to={tabData.to}
              />)
            })
          }
        </TabList>
        <Box
          sx={(theme) => ({
            display: {
              md: styles.direction === 'row' ? 'none' : 'block'
            },
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
            background: styles.background === 'theme' ? 'var(--bg)' : 'transparent',
            boxShadow: '0 0 0 100vmax var(--bg)',
            clipPath: 'inset(0 -100vmax)',
            flexGrow: 1,
            justifyContent: 'center',
            maxWidth: '29.875em',
            width: '100%',
            margin: 'auto',
            borderLeft: {
              md: styles.borderColor && '0.1em solid var(--joy-palette-neutral-outlinedBorder, var(--joy-palette-neutral-200, #D8D8DF))'
            }
          })}
        >
          {tabPanels}
        </Box>
      </Tabs>
    </Box>
  )
}
