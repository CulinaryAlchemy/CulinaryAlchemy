import '@fontsource/public-sans'
import CssBaseline from '@mui/joy/CssBaseline'
import Typography from '@mui/joy/Typography'
import { CssVarsProvider } from '@mui/joy/styles'


function App () {

  return (
    <CssVarsProvider
      defaultMode='dark'
      colorSchemeSelector="#demo_dark-mode-by-default"
      //
      // the local storage key to use
      modeStorageKey="demo_dark-mode-by-default"
      //
    >
      <CssBaseline />
      <div id="demo_dark-mode-by-default">
        <Typography level='h1'>Initializing project</Typography>
      </div>
    </CssVarsProvider>
  )
}

export default App
