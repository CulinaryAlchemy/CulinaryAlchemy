import { setDefaultAxiosConfig } from '@/config'
import { AuthContextProvider } from '@/context'
import { Routing } from '@/routing'

import '@fontsource/public-sans'
import CssBaseline from '@mui/joy/CssBaseline'
import { CssVarsProvider } from '@mui/joy/styles'

import { Toaster } from 'sonner'

setDefaultAxiosConfig()

function App () {
  return (
    <CssVarsProvider
      defaultMode="system"
    >
      <CssBaseline />
      <AuthContextProvider>
        <Routing />
        <Toaster richColors />
      </AuthContextProvider>
    </CssVarsProvider>
  )
}

export default App
