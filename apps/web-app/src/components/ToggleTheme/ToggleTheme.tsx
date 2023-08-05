import { useToggleTheme, useTranslation } from '@/hooks'
import { CThemesModes } from '@/models/UI'
import DarkMode from '@mui/icons-material/DarkMode'
import LightMode from '@mui/icons-material/LightMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import ListItem from '@mui/joy/ListItem'
import ListItemButton from '@mui/joy/ListItemButton'
import Sheet from '@mui/joy/Sheet'

export const ToggleTheme = () => {
  const { t } = useTranslation()
  const { actualMode, toggleTheme } = useToggleTheme()

  const handleOnClick = () => {
    toggleTheme()
  }

  return (
        <ListItem
            role="none"
            endAction={
                <Sheet variant='outlined' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '2.375em', height: '1.75em', borderRadius: '0.4em' }}>
                    {
                        actualMode === CThemesModes.dark && <DarkMode />
                    }
                    {
                        actualMode === CThemesModes.light && <LightMode />
                    }
                    {
                        actualMode === CThemesModes.system && <SettingsBrightnessIcon />
                    }
                </Sheet>
            }
        >
            <ListItemButton onClick={handleOnClick} role="menuitem">
                {t('theme')}
            </ListItemButton>
        </ListItem>
  )
}
