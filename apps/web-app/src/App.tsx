import { Routing } from '@/routing'
import '@fontsource/public-sans'
import CssBaseline from '@mui/joy/CssBaseline'
import { CssVarsProvider, extendTheme } from '@mui/joy/styles'

const theme = extendTheme({ cssVarPrefix: 'demo' })

function App () {
  return (
    <CssVarsProvider
      defaultMode="dark"
      // the props below are specific to this demo,
      // you might not need them in your app.
      //
      theme={theme}
    >
      <CssBaseline />
        <Routing />
    </CssVarsProvider>
  )
}

export default App
