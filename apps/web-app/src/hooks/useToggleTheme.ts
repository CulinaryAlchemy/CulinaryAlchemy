import { CThemesModes } from '@/models/UI'
import { useColorScheme } from '@mui/joy/styles/'

export const useToggleTheme = () => {
  const { mode: actualMode, setMode } = useColorScheme()

  const toggleTheme = () => {
    let newMode = actualMode

    if (actualMode === CThemesModes.dark) {
      newMode = CThemesModes.light
    } else if (actualMode === CThemesModes.light) {
      newMode = CThemesModes.system
    } else {
      newMode = CThemesModes.dark
    }

    setMode(newMode)
  }

  return { toggleTheme, actualMode }
}
