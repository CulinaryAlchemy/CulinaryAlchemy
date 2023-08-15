import Box from '@mui/joy/Box'
import { SettingsHeader, SettingsMain } from './components'

const Settings = () => {
  return (
        <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
            <Box
                component="main"
                className="MainContent"
                sx={(theme) => ({
                  '--main-paddingTop': {
                    xs: `calc(${theme.spacing(2)} + var(--Header-height, 0px))`,
                    md: '32px'
                  },
                  px: {
                    xs: 1,
                    md: 3
                  },
                  pb: {
                    xs: 2,
                    sm: 2,
                    md: 3
                  },
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  minWidth: 0,
                  height: '100dvh'
                })}
            >
                <SettingsHeader />
                <SettingsMain />
            </Box>
        </Box>
  )
}

export default Settings
