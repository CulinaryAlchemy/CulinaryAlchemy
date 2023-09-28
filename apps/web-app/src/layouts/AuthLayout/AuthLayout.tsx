import { Header } from '@/components'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'
import { lazy } from 'react'
import { Outlet } from 'react-router-dom'

interface IProps {
  showBackground: boolean
}

const Background = lazy(() => import('./components/Background/Background'))

const AuthLayout: React.FC<IProps> = ({ showBackground }) => {
  return (
        <Box
          sx={{
            display: 'grid',
            overflow: 'hidden',
            gridTemplateColumns: {
              md: '1.03fr 1fr',
              sx: '1fr'
            }
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100vh'
            }}
          >
            <Header />
            <Box
              sx={{
                flexGrow: 1
              }}
            >
              <Outlet />
            </Box>
            <Typography
              level='body3'
              sx={{
                fontWeight: 600,
                alignSelf: 'center',
                marginBottom: '1em'
              }}
            >@ CulinaryAlchemy 2023</Typography>
          </Box>
          {showBackground && <Background />}
        </Box>
  )
}

export default AuthLayout
