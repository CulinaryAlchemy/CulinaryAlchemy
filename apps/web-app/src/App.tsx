import { CSWRConfig, setDefaultAxiosConfig } from '@/config'
import '@/config/i18next/i18next.config'
import { AuthContextProvider } from '@/context'
import { Routing } from '@/routing'
import { SWRConfig } from 'swr'

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
        <SWRConfig value={CSWRConfig}>
          <Routing />
          <Toaster richColors />
        </SWRConfig>
      </AuthContextProvider>
    </CssVarsProvider>
  )
}

export default App
