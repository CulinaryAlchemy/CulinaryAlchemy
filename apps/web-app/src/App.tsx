import { Routing } from '@/routing'
import '@fontsource/public-sans'
import CssBaseline from '@mui/joy/CssBaseline'
import { CssVarsProvider } from '@mui/joy/styles'


function App () {
  return (
    <CssVarsProvider
      defaultMode="dark"
    >
      <CssBaseline />
        <Routing />
    </CssVarsProvider>
  )
}

export default App
