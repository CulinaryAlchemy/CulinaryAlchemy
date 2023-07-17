import '@fontsource/public-sans'
import CssBaseline from '@mui/joy/CssBaseline'
import { CssVarsProvider, extendTheme } from '@mui/joy/styles'
import { Header } from './components/Header/Header'
import { Login } from './components/Login/Login'

const theme = extendTheme({ cssVarPrefix: 'demo' });

function App () {

  return (
    <CssVarsProvider
      defaultMode="dark"
      // the props below are specific to this demo,
      // you might not need them in your app.
      //
      theme={theme}
      // the selector to apply CSS theme variables stylesheet.
      colorSchemeSelector="#demo_dark-mode-by-default"
      //
      // the local storage key to use
      modeStorageKey="demo_dark-mode-by-default"
      //
      // set as root provider
      disableNestedContext
    >
      <CssBaseline />
      <div id="demo_dark-mode-by-default">
        <Header />
        <Login />
      </div>
    </CssVarsProvider>
  )
}

export default App
