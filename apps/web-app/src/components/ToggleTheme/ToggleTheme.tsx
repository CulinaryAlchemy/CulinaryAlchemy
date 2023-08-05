import { useToggleTheme } from '@/hooks'
import { CThemesModes } from '@/models/UI'
import DarkMode from '@mui/icons-material/DarkMode'
import LightMode from '@mui/icons-material/LightMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import IconButton from '@mui/joy/IconButton'

export const ToggleTheme = () => {
  const { actualMode, toggleTheme } = useToggleTheme()

  const onClick = () => {
    toggleTheme()
  }

  return (
    <IconButton color="neutral" variant="plain" onClick={onClick}>
        {
            actualMode === CThemesModes.dark && <DarkMode />
        }
        {
            actualMode === CThemesModes.light && <LightMode />
        }
        {
            actualMode === CThemesModes.system && <SettingsBrightnessIcon />
        }
    </IconButton>)
}
