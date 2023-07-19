import DarkMode from '@mui/icons-material/DarkMode'
import LightMode from '@mui/icons-material/LightMode'
import IconButton from '@mui/joy/IconButton'
import { useColorScheme } from '@mui/joy/styles/'


type TModes = Record<string, 'light' | 'dark' | 'system'>

const CModes: TModes = {
  dark: 'dark',
  light: 'light'
}

export const ToggleTheme = () => {
  const { mode: actualMode, setMode } = useColorScheme()

  const onClick = () => {
    let newMode = actualMode

    if (actualMode === CModes.dark) {
      newMode = CModes.light
    } else {
      newMode = CModes.dark
    }

    setMode(newMode)
  }

  return (
    <IconButton color="neutral" variant="plain" onClick={onClick}>
        {
            actualMode === CModes.dark ? <DarkMode /> : <LightMode />
        }
    </IconButton>)
}
