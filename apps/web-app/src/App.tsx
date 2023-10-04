import { CSWRConfig, setDefaultAxiosConfig } from '@/config'
import { AuthContextProvider } from '@/context'
import { Routing } from '@/routing'

import { GlobalComponents } from '@/components'
import '@/config/i18next/i18next.config'
import '@fontsource/public-sans'
import CssBaseline from '@mui/joy/CssBaseline'
import { CssVarsProvider } from '@mui/joy/styles'
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
          <GlobalComponents />
        </SWRConfig>
      </AuthContextProvider>
    </CssVarsProvider>
  )
}

export default App
