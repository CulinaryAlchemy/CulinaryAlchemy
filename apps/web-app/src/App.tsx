import { TestServerStatus } from '@/components'
import { CSWRConfig, setDefaultAxiosConfig } from '@/config'
import { AuthContextProvider } from '@/context'
import { Routing } from '@/routing'

import '@/config/i18next/i18next.config'
import '@fontsource/public-sans'
import CssBaseline from '@mui/joy/CssBaseline'
import { CssVarsProvider } from '@mui/joy/styles'
import { Toaster } from 'sonner'
import { SWRConfig } from 'swr'

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
          <Toaster
            richColors
            theme='light'
            visibleToasts={3}
          />
          <div id='portalElement' />
          <TestServerStatus />
        </SWRConfig>
      </AuthContextProvider>
    </CssVarsProvider>
  )
}

export default App
