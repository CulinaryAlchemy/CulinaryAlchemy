import { DropDownItem } from '@/components'
import { useGlobalAuth, useToggleTheme, useToggleTranslation, useTranslation } from '@/hooks'
import { CThemesModes } from '@/models/UI'
import { frontRoutes } from '@/routing'

import DarkMode from '@mui/icons-material/DarkMode'
import LightMode from '@mui/icons-material/LightMode'
import List from '@mui/joy/List'
import ListDivider from '@mui/joy/ListDivider'

export const DropDownListOfItems = () => {
  const { t } = useTranslation()
  const { actualMode, toggleTheme } = useToggleTheme()
  const { language, toggleTranslation } = useToggleTranslation()
  const { signOut, user } = useGlobalAuth()

  return (
    <List
      role="menu"
      aria-label="About"
      variant="outlined"
      sx={{
        overflow: 'hidden',
        boxShadow: 'md',
        minWidth: 180,
        '--List-radius': '8px',
        '--List-padding': '4px',
        '--ListDivider-gap': '4px'
      }}
    >

      <DropDownItem type='link' itemText={t('my profile')} url={frontRoutes.Dynamic.user(user?.username as string)} />
      <DropDownItem type='link' itemText={t('settings')} url={frontRoutes.Static.settings} />
      <ListDivider />
      <DropDownItem
        type='button'
        itemText={t('theme')}
        itemAtTheEnd={
          <>
            {
              actualMode === CThemesModes.dark && <DarkMode />
            }
            {
              actualMode === CThemesModes.light && <LightMode />
            }
          </>
        }
        onClick={toggleTheme}
      />
      <DropDownItem
        type='button'
        itemText={t('language')}
        itemAtTheEnd={language}
        onClick={toggleTranslation}
      />
      <ListDivider />
      <DropDownItem
        type='button'
        itemText={t('sign out')}
        onClick={signOut}
      />
    </List>
  )
}
