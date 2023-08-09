import { CThemesModes } from '@/models/UI'
import { useColorScheme } from '@mui/joy/styles/'

export const useToggleTheme = () => {
  const { colorScheme: actualMode, setMode } = useColorScheme()

  const toggleTheme = () => {
    let newMode = actualMode

    if (actualMode === CThemesModes.dark) {
      newMode = CThemesModes.light
    } else {
      newMode = CThemesModes.dark
    }

    setMode(newMode)
  }

  return { toggleTheme, actualMode }
}
